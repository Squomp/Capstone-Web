import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class SignUp extends Component {

  constructor () {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
      redirect: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    // POST form data
    var url = '/api/auth/register';
    axios.post(url, {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    // redirect to home
    this.setState({ redirect: true });
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
          <label>Username:
            <input type="text" name="username" onChange={this.handleChange} />
          </label>
          <br></br>
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

export default SignUp;
