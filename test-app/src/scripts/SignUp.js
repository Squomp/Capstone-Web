import React, { Component } from 'react';
import axios from 'axios';

class SignUp extends Component {

  constructor () {
    super();
    this.state = {
      username: '',
      email: '',
      password: ''
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

  }

  handleChange (e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="App">
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
