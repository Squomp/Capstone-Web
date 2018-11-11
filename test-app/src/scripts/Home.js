import React, { Component } from 'react';
import '../styles/HomeStyle.css';
import axios from 'axios';
import { VictoryPie } from 'victory';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import TransactionList from './TransactionList.js';
import Log from './Log.js';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#208BDB',
      main: '#1C50C4',
      dark: '#2B33DB',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      data: undefined,
      username: '',
      redirectPath: '',
      shouldRedirect: false,
      pieData: [
        { x: "Spent", y: 0 },
        { x: "Remaining", y: 100 }
      ],
      transactions: [],
      startDate: moment(),
      endDate: moment().add(7, 'days'),
      currStartDate: '',
      currEndDate: '',
    }
    this.handleClick = this.handleClick.bind(this);
    // this.AuthButtons = this.AuthButtons.bind(this);
    this.PeriodData = this.PeriodData.bind(this);
    this.LoginSignUp = this.LoginSignUp.bind(this);
    this.getData = this.getData.bind(this);
    this.handleDateSelect = this.handleDateSelect.bind(this);
    this.getTransactions = this.getTransactions.bind(this);
  }

  getData() {
    // axios.get('/api/finance/plan')
    //   .then((response) => {
    //     if (response.data.data.period.first_day === moment.format('dddd').toLowerCase()) {
    //       this.handleClick()
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error.response);
    //   })
    axios.all([
      axios.get('/api/finance/current'),
      axios.get('/api/user')
    ])
      .then(axios.spread((financeRes, userRes) => {
        console.log(financeRes);
        this.setState({
          loggedIn: true,
          data: financeRes.data.data,
          username: userRes.data.data.user.username,
          pId: financeRes.data.data.period.period_id,
          currStartDate: moment(financeRes.data.data.period.start_date).format('MM/DD'),
          currEndDate: moment(financeRes.data.data.period.end_date).format('MM/DD'),
          pieData: [
            { x: '$' + financeRes.data.data.period.spent, y: financeRes.data.data.period.spent },
            { x: '$' + financeRes.data.data.period.remaining, y: financeRes.data.data.period.remaining }
          ]
        });
        this.getTransactions();
      }))
      .catch((error) => {
        console.log(error);
      });
  }

  getTransactions() {
    axios.post('/api/finance/transactions', { periodId: this.state.pId })
      .then((response) => {
        this.setState({
          transactions: response.data.data.transactions
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  componentDidMount = () => {
    this.getData();
  }

  handleClick() {
    axios.post('/api/finance/period', {
      start_date: this.state.startDate.format('YYYY-MM-DD'),
      end_date: this.state.endDate.format('YYYY-MM-DD')
    })
      .then((response) => {
        this.render();
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  LoginSignUp() {

    return (
      <div className='auth'>
        <div className='login authContainer'>
          <LogIn callBack={this.getData} />
        </div>
        <div className='signup authContainer'>
          <SignUp callBack={this.getData} />
        </div>
      </div>
    )
  }

  PeriodData() {
    const spent = this.state.data.period.spent;
    const remaining = this.state.data.period.remaining;

    return (
      <div style={{ width: '100%', padding: '5% 0' }}>
        <div className='mainContainer'>
          <div className="periodData">
            <h2>Current Period for {this.state.currStartDate} to {this.state.currEndDate}</h2>
            <div className="moneyData">
              <span className="moneyLabel makeOrange">Spent: ${spent}</span>
              <span className="moneyLabel makeBlue">Remaining: ${remaining}</span>
            </div>
            <div className="pieChart">
              <VictoryPie
                data={this.state.pieData}
                // to not show labels
                // labels={() => null}
                animate={{ duration: 2000 }}
                colorScale={["orange", "#1CC4ED"]}
              />
            </div>
          </div>
          <div className='treeImg'>

          </div>
        </div>

        <div className='mainContainer transContainer'>
          <div className='transList'>
            <h2 className="transHeader">Transactions</h2>
            <TransactionList transactions={this.state.transactions} />
          </div>
          <div className='logContainer'>
            <Log callBack={this.getTransactions} />
          </div>
        </div>
      </div>
    );
  }

  handleDateSelect() {

  }

  render() {
    const data = this.state.data;
    const loggedIn = this.state.loggedIn;
    return (
      <div className="home body">
        <MuiThemeProvider theme={theme}>
          {this.state.username ? <h1>Welcome, {this.state.username}!</h1> : <h1>Log in or sign up to use features</h1>}
          {loggedIn ?
            (
              <div>
                <div className="data">
                  <div className="row">{data.period ? <this.PeriodData /> : <h3>Start a new period</h3>}</div>
                  <h2 style={{ textAlign: 'center' }}>Start a New Period</h2>
                  <div className='row'>
                    <span className='datePicker'>
                      Start Date: <DatePicker
                        selected={this.state.startDate}
                        onSelect={(date) => { this.setState({ startDate: date }) }} />
                    </span>
                    <span className='datePicker'>
                      End Date: <DatePicker
                        selected={this.state.endDate}
                        onSelect={(date) => { this.setState({ endDate: date }) }} />
                    </span>
                  </div>
                  <div className="row">
                    <Button
                      variant="outlined" color="primary" name="newPeriod"
                      onClick={this.handleClick}>New Period</Button>
                  </div>
                </div>
              </div>
            ) : <this.LoginSignUp />}

        </MuiThemeProvider>
      </div>
    );
  }
}

export default Home;
