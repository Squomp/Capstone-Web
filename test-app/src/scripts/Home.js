import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import '../styles/Home.css';
import axios from 'axios';

class Home extends Component {

  constructor() {
    super();
    this.state = {
      success: true,
      logs: [],
      redirectPath: ''
    }
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount = () => {
    axios.get('/api/finance/logs')
    .then( (response) => {
      console.log(response.data.data.tests);
      this.setState({
        logs: response.data.data.tests,
        success: response.data.success
      });
    })
    .catch( (error) => {
      this.setState({ success: false });
      console.log(error);
    });
  }

  renderRedirect = () => {
    if (this.state.redirect !== '/') {
      return <Redirect to={this.state.redirectPath} />
    }
  }

  handleClick(e) {
    this.setState({ redirectPath: '/' + e.target.name });
  }

  render() {
    return (
      <div className="App">
        <h1>home</h1>
        {this.renderRedirect()}
        { this.state.logs.length > 0 ? (
          <p>{this.state.logs[0].amount}</p>
          )
          :
          (
            <div>
              <button name="login" onClick={this.handleClick}>Log In</button>
              <button name="signup" onClick={this.handleClick}>Sign Up</button>
            </div>
          )
        }
      </div>
    );
  }
}

export default Home;
