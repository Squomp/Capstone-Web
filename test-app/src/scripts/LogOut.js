import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class LogOut extends Component {

  constructor () {
    super();
    this.state = {
      redirect: false
    };
  }

  componentDidMount() {
    // POST to logout
    axios.post('/api/auth/logout')
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
      <div className="lougout body">
        {this.renderRedirect()}
      </div>
    );
  }
}

export default LogOut;
