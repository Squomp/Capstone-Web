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
    this.getData = this.getData.bind(this);
    this.update = this.update.bind(this);
  }

  getData() {
    axios.all([
      axios.get('/api/finance/current'),
      axios.get('/api/user')
    ])
      .then(axios.spread((financeRes, userRes) => {
        console.log(financeRes.data.data.period.spent);
        console.log(financeRes.data.data.period.remaining);
        this.setState({
          loggedIn: true,
          data: financeRes.data.data,
          username: userRes.data.data.user.username,
          pId: financeRes.data.data.period.period_id,
          currStartDate: moment(financeRes.data.data.period.start_date).format('MM/DD'),
          currEndDate: moment(financeRes.data.data.period.end_date).format('MM/DD'),
          pieData: [
            { x: '$' + financeRes.data.data.period.spent.toFixed(2), y: financeRes.data.data.period.spent },
            { x: '$' + financeRes.data.data.period.remaining.toFixed(2), y: financeRes.data.data.period.remaining }
          ]
        });
      }))
      .catch((error) => {
        console.log(error.response);
      });
  }

  componentDidMount = () => {
    this.getData();
  }

  update() {
    this.getData();
  }

  LoginSignUp() {

    return (
      <div className='auth'>
        <div className='login authContainer'>
          <LogIn callBack={this.update} />
        </div>
        <div className='signup authContainer'>
          <SignUp callBack={this.update} />
        </div>
      </div>
    )
  }

  PeriodData() {
    const spent = this.state.data.period.spent;
    const remaining = this.state.data.period.remaining;
    const amount = this.state.data.period.amount.toFixed(2);
    console.log(spent + ' ' + remaining);
    return (
      <div style={{ width: '100%', padding: '5% 0' }}>
        <div className='mainContainer'>
          <div className="periodData">
            <h2>Current Period for {this.state.currStartDate} to {this.state.currEndDate}</h2>
            <h3>Today's date is {moment().format('dddd MM/DD')}</h3>
            <div className='data'>
              <div className="pieChart">
                <VictoryPie
                  data={this.state.pieData}
                  // to not show labels
                  // labels={() => null}
                  animate={{
                    duration: 2000,
                    onLoad: { duration: 1000 }
                  }}
                  colorScale={["#AB0D26", "#339E21"]}
                />
              </div>
              <div className="moneyData">
                <p className="moneyLabel makeRed">Spent: ${spent}</p>
                <p className="moneyLabel makeGreen">Remaining: ${remaining}</p>
              </div>
            </div>
            <NewPeriod amount={amount} callBack={this.getData} />
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
        {this.state.username ? <h1 style={{ textAlign: 'center' }}>Welcome, {this.state.username}!</h1> : <h1>Log in or sign up to use features</h1>}
        {loggedIn ?
          (
            <div>
              <div className="data">
                {data.period ? <this.PeriodData /> : <NewPeriod amount={50} />}
              </div>
            </div>
          ) : <this.LoginSignUp />}
      </div>
    );
  }
}

export default Home;
