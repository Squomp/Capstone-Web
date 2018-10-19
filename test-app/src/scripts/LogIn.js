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
      redirect: false,
      message: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    // POST form data
    axios.post('/api/auth/login', {
      email: this.state.email,
      password: this.state.password
    })
    .then( (response) => {
      console.log(response);
      if (response.data.success) {
        this.setState({ redirect: true });
      }
    })
    .catch( (error) => {
      console.log(error.response);
      this.setState({ message: 'Invalid credentials'});
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
      <div className="login body">
      {this.renderRedirect()}
      <h1>Log In</h1>

      <p className="errorMessage">{this.state.message}</p>
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
