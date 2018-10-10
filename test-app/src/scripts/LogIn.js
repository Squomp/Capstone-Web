import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class LogIn extends Component {

  constructor () {
    super();
    this.state = {
      email: '',
      password: '',
      redirect: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    // POST form data
    axios.post('/api/auth/login', {
      email: this.state.email,
      password: this.state.password
    })
    .then( (response) => {
      console.log(response);
      // redirect to home
      this.setState({ redirect: true });
    })
    .catch( (error) => {
      console.log(error);
    });
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/' />
    }
  }

  handleChange (e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="App">
      {this.renderRedirect()}
        <form onSubmit={this.handleSubmit}>
          <label>Email:
            <input type="text" name="email" onChange={this.handleChange} />
          </label>
          <br></br>
          <label>Password:
            <input type="text" name="password" onChange={this.handleChange} />
          </label>
          <br></br>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}

export default LogIn;
