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
      redirect: false,
      message: ''
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
      if (response.data.success) {
        this.setState({ redirect: true });
      }
    })
    .catch(function (error) {
      console.log(error.response);
      this.setState({ message: 'Failed to create account'});
    });
    // redirect to home
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
      <div className="signup body">
        {this.renderRedirect()}
        <h1>Sign Up</h1>
        <p className="errorMessage">{this.state.message}</p>
        <form onSubmit={this.handleSubmit}>
          <label>
            <span>
              Username
            </span>
            <input type="text" class="input-field" name="username" onChange={this.handlChange} />
          </label>

          <label>
            <span>
              Email
            </span>
            <input type="text" class="input-field" name="email" onChange={this.onChange} />
          </label>

          <label>
            <span>
              Password
            </span>
            <input type="password" class="input-field" name="password" onChange={this.onChange} />
          </label>

          <input type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}

export default SignUp;
