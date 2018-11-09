import React, { Component } from 'react';
import axios from 'axios';

class Plan extends Component {

  constructor() {
    super();
    this.state = {
      period: 'weekly',
      amount: 0,
      startDay: 'monday'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    // POST form data
    axios.post('/api/finance/plan', {
      amount: this.state.amount,
      period: this.state.period,
      firstDay: this.state.startDay
    })
      .then((response) => {
        console.log(response);
        let path = `/`;
        this.props.history.push(path);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className='plan body'>
        <h1>Create a plan</h1>

        <form onSubmit={this.handleSubmit}>
          <label>
            <span>
              Amount
            </span>
            $<input class="input-field" type="number" step="0.01" name="amount" onChange={this.handleChange} />
          </label>

          <label>
            <span>
              Period
            </span>
            <select class="select-field" name="period" value={this.state.period} onChange={this.handleChange}>
              <option value="weekly">Weekly</option>
            </select>
          </label>

          <label>
            <span>
              Start Day:
            </span>
            <select class="select-field" name="startDay" onChange={this.handleChange}>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              <option value="saturday">Saturday</option>
              <option value="sunday">Sunday</option>
            </select>
          </label>

          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Plan;
