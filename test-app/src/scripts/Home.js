import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import '../styles/HomeStyle.css';
import axios from 'axios';
import CanvasJS from 'canvasjs';

class Home extends Component {

  constructor() {
    super();
    this.state = {
      data: undefined,
      username: '',
      redirectPath: '',
      shouldRedirect: false
    }
    this.handleClick = this.handleClick.bind(this);
    this.AuthButtons = this.AuthButtons.bind(this);
    this.PeriodData = this.PeriodData.bind(this);
  }

  componentDidMount = () => {
    axios.all([
      axios.get('/api/finance/current'),
      axios.get('/api/user')
    ])
    .then(axios.spread((financeRes, userRes) => {
        this.setState({
          data: financeRes.data.data,
          username: userRes.data.data.user.username
        });
    }))
    .catch( (error) => {
      console.log(error.response);
    });
  }

  renderRedirect = () => {
    if (this.state.shouldRedirect && this.state.redirect !== '/') {
      return <Redirect to={this.state.redirectPath} />
    }
  }

  handleClick(e) {
    if (e.target.name === 'newPeriod') {
      axios.post('/api/finance/period')
      .then( (response) => {
        console.log(response);
      })
      .catch( (error) => {
        console.log(error.response  );
      });
    } else {
      this.setState({
        redirectPath: '/' + e.target.name ,
        shouldRedirect: true
      });
    }
  }

  AuthButtons() {
    return (
      <div className="authButtons">
        <button name="login" onClick={this.handleClick}>Log In</button>
        <button name="signup" onClick={this.handleClick}>Sign Up</button>
      </div>
    );
  }

  PeriodData() {

    const spent = this.state.data.period.spent;
    const remaining = this.state.data.period.remaining;

    const options = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "dark2", // "light1", "dark1", "dark2"
			title:{
				text: "Your Funds"
			},
			data: [{
				type: "pie",
				indexLabel: "{label}: {y}%",		
				startAngle: -90,
				dataPoints: [
					{ y: spent, label: "Spent" },
					{ y: 24, label: "Remaining" }
				]
			}]
		}
      {/*You can get reference to the chart instance as shown above using onRef. 
      This allows you to access all chart properties and methods*/}

    return (
      <div className="periodData">
        <div className="moneyValues">
          <p>Money Spent: ${spent}</p>
          <p>Money Remaining: ${remaining}</p>
        </div>

        <CanvasJSChart options = {options} 
				  onRef={ref => this.chart = ref}/>
      </div>
    );
  }

  render() {
    const data = this.state.data;
    return (
      <div className="home">
        { this.renderRedirect() }
        { this.state.username ? <h1>Welcome, {this.state.username}!</h1> : <h1>Log in or sign up to use features</h1> }
        { data !== undefined ?
          (
            <div className="data">
              <div className="row"><h2>Your Current Period</h2></div>
              <div className="row">{ data.period ? <this.PeriodData /> : <h3>Start a new period</h3> }</div>
              {console.log(data.period)}
              <div className="row"><button name="newPeriod" onClick={this.handleClick}>New Period</button></div>
            </div>
          ) : <this.AuthButtons /> }

          
      </div>
    );
  }
}

export default Home;
