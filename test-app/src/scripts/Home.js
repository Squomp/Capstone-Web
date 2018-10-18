import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import '../styles/Home.css';
import axios from 'axios';

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
      <div>
        <button name="login" onClick={this.handleClick}>Log In</button>
        <button name="signup" onClick={this.handleClick}>Sign Up</button>
      </div>
    );
  }

  PeriodData() {
    return (
      <div>
        <p>{this.state.data.period.spent}</p>
        <p>{this.state.data.period.remaining}</p>
      </div>
    );
  }

  render() {
    const data = this.state.data;
    return (
      <div className="App">
        { this.renderRedirect() }
        { this.state.username ? <h1>Welcome, {this.state.username}</h1> : <h1>Log in or sign up to use features</h1> }
        { data !== undefined ?
          (
            <div>
              { data.period && <this.PeriodData />}
              {console.log(data.period)}
              <br></br>
              <button name="newPeriod" onClick={this.handleClick}>New Period</button>
            </div>
          ) : <this.AuthButtons /> }
      </div>
    );
  }
}

export default Home;
