import React, { Component } from 'react';
import '../styles/HomeStyle.css';
import axios from 'axios';
import { VictoryPie } from 'victory';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import TransactionList from './TransactionList.js';
import moment from 'moment';

const theme = createMuiTheme({ //
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
      transactions: []
    }
    this.handleClick = this.handleClick.bind(this);
    // this.AuthButtons = this.AuthButtons.bind(this);
    this.PeriodData = this.PeriodData.bind(this);
    this.LoginSignUp = this.LoginSignUp.bind(this);
    this.getData = this.getData.bind(this);
  }

  getData() {
    axios.get('/api/finance/plan')
      .then((response) => {
        if (response.data.data.period.first_day === moment.format('dddd').toLowerCase()) {
          this.handleClick()
        }
      })
      .catch((error) => {
        console.log(error.response);
      })
    if (moment().format('dddd')) {

    }
    axios.all([
      axios.get('/api/finance/current'),
      axios.get('/api/user')
    ])
      .then(axios.spread((financeRes, userRes) => {
        this.setState({
          loggedIn: true,
          data: financeRes.data.data,
          username: userRes.data.data.user.username,
          pId: financeRes.data.data.period.period_id,
          pieData: [
            { x: '$' + financeRes.data.data.period.spent, y: financeRes.data.data.period.spent },
            { x: '$' + financeRes.data.data.period.remaining, y: financeRes.data.data.period.remaining }
          ]
        });
        axios.post('/api/finance/transactions', { periodId: this.state.pId })
          .then((response) => {
            this.setState({
              transactions: response.data.data.transactions
            });
          })
          .catch((error) => {
            console.log(error.response);
          })
      }))
      .catch((error) => {
        console.log(error.response);
      });
  }

  componentDidMount = () => {
    this.getData();
  }

  handleClick() {
    axios.post('/api/finance/period')
      .then((response) => {
        this.render();
      })
      .catch((error) => {
        console.log(error.response);
        this.render();
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
      <div style={{ width:'100%', padding:'5%' }}>
        <div className='mainContainer'>
          <div className="periodData">
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

        <h2 className="transHeader">Transactions</h2>
        <div className='transList'>
          <TransactionList transactions={this.state.transactions} />
        </div>
      </div>
    );
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
                  <div className="row"><h2>Your Current Period</h2></div>
                  <div className="row">{data.period ? <this.PeriodData /> : <h3>Start a new period</h3>}</div>
                  <div className="row">
                    <Button
                      variant="outlined" color="primary" name="newPeriod"
                      onClick={this.handleClick}>New Period</Button>
                  </div>
                </div>
                {/* <div className='treeImg'>

                </div> */}
              </div>
            ) : <this.LoginSignUp />}

        </MuiThemeProvider>
      </div>
    );
  }
}

export default Home;
