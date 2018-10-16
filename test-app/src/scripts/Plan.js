import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class Plan extends Component {

  constructor() {
    super();
    this.state = {
      period: 'weekly',
      amount: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    // POST form data
    axios.post('/api/finance/plan', {
      amount: this.state.amount,
      period: this.state.period
    })
    .then( (response) => {
      console.log(response);
    })
    .catch( (error) => {
      console.log(error);
    });
  }

  handleChange (e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className='App'>
        <form onSubmit={this.handleSubmit}>
          <label>Amount: $
            <input type="number" step="0.01" name="amount" onChange={this.handleChange} />
          </label>
          <br></br>
          <label> Day of the week:
            <select name="period" value={this.state.period} onChange={this.handleChange}>
              <option value="weekly">Weekly</option>
            </select>
          </label>
          <br></br>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}

export default Plan;
