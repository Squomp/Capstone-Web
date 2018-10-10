import React, { Component } from 'react';
import '../styles/Home.css';
import axios from 'axios';

class Home extends Component {

  constructor() {
    super();
    this.state = {
      success: true,
      currUserData: ''
    }
  }

  componentDidMount() {
    axios.get('/api/user')
    .then( (response) => {
      console.log(response);
      console.log(this.state.currUserData);
      console.log(this.state.success);
      this.setState({ currUserData: response.data.data.user, success: response.data.success });
    })
    .catch( (error) => {
      this.setState({ success: false });
      console.log(error);
    });
  }

  render() {
    return (
      <div className="App">
        <h1>home</h1>
        { this.state.success ?
          <p>{this.state.currUserData.username}</p>
          :
          <p>Log in to use features</p>
        }
      </div>
    );
  }
}

export default Home;
