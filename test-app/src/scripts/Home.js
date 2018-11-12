import React, { Component } from 'react';
import '../styles/HomeStyle.css';
import axios from 'axios';
import { VictoryPie } from 'victory';
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import NewPeriod from './NewPeriod';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      data: undefined,
      username: '',
      pieData: [
        { x: "Spent", y: 0 },
        { x: "Remaining", y: 100 }
      ],
      currStartDate: '',
      currEndDate: '',
    }
    this.PeriodData = this.PeriodData.bind(this);
    this.LoginSignUp = this.LoginSignUp.bind(this);
    this.getData = this.getData.bind(this);
    this.handleDateSelect = this.handleDateSelect.bind(this);
    this.getTransactions = this.getTransactions.bind(this);
  }

  getData() {
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
        console.log(error.response);
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
        console.log(error.response);
      })
  }

  componentDidMount = () => {
    this.getData();
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
    const amount = this.state.data.period.amount;
    console.log(amount);
    return (
      <div style={{ width: '100%', padding: '5% 0' }}>
        <div className='mainContainer'>
          <div className="periodData">
            <h2>Current Period for {this.state.currStartDate} to {this.state.currEndDate}</h2>
            <h3 style={{ textAlign: 'center' }}>Today's date is {moment().format('dddd MM/DD')}</h3>
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
            <NewPeriod amount={amount}/>
          </div>
          <div className='treeImg'>

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
        {this.state.username ? <h1>Welcome, {this.state.username}!</h1> : <h1>Log in or sign up to use features</h1>}
        {loggedIn ?
          (
            <div>
              <div className="data">
                <div className="row">{data.period ? <this.PeriodData /> : <NewPeriod amount={50} />}</div>
              </div>
            </div>
          ) : <this.LoginSignUp />}
      </div>
    );
  }
}

export default Home;
