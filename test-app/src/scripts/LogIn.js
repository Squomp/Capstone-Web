import React, { Component } from 'react';
import '../styles/LogIn.css';
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
    })
    .catch( (error) => {
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
      <div className="login">
      {this.renderRedirect()}
      <h1>Log In</h1>

        <form onSubmit={this.handleSubmit}>

          <label>
            <span>
              Email
            </span>
            <input type="text" class="input-field" name="email" onChange={this.handleChange} />
          </label>

          <label>
            <span>
              Password
            </span>
            <input type="password" class="input-field" name="password" onChange={this.handleChange} />
          </label>

          <input type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}

export default LogIn;
