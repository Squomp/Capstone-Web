import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

class SignUp extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
      message: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.username);
    // POST form data
    axios.post('/api/auth/register', {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    })
      .then((response) => {
        console.log('register success');
        axios.post('/api/finance/period', {
          start_date: moment().format('YYYY-MM-DD'),
          end_date: moment().add(7, 'days').format('YYYY-MM-DD'),
          amount: 50
        })
          .then((response) => {
            console.log('period started')
            this.props.callBack();
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error.response);
        this.setState({ message: 'Failed to create account' });
      });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="signup body">
        <h1>Sign Up</h1>
        <p className="errorMessage">{this.state.message}</p>
        <form onSubmit={this.handleSubmit}>
          <label>
            <span>
              Username
            </span>
            <input type="text" className="input-field" name="username"
              onChange={this.handleChange} />
          </label>

          <label>
            <span>
              Email
            </span>
            <input type="text" className="input-field" name="email"
              onChange={this.handleChange} />
          </label>

          <label>
            <span>
              Password
            </span>
            <input type="password" className="input-field" name="password"
              onChange={this.handleChange} />
          </label>

          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default SignUp;
