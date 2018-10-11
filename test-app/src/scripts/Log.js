import React, { Component } from 'react';
import axios from 'axios';
import '../styles/Log.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

class Log extends Component {

  constructor () {
    super();
    this.state = {
      isWeekly: false,
      isMoneyIn: false,
      amount: 0,
      dayOfWeek: '',
      dayOfMonth: moment()
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDateSelect = this.handleDateSelect.bind(this);
    this.WeeklySection = this.WeeklySection.bind(this);
    this.MonthlySection = this.MonthlySection.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    // POST form data
    axios.post('/api/finance/log', {
      amount: this.state.amount
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

  handleDateSelect(date) {
    this.setState({ ['dayOfMonth']: date });
  }

  WeeklySection() {
    return (
        <div>
          <label> Day of the week:
            <select name="dayOfWeek" onChange={this.handleChange}>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              <option value="saturday">Saturday</option>
              <option value="sunday">Sunday</option>
            </select>
          </label>
        </div>
    );
  }

  MonthlySection() {
    return (
      <div>
        <label>
          Day of the month: <DatePicker
                            selected={this.state.dayOfMonth}
                            onSelect={this.handleDateSelect} />
        </label>
      </div>
    );
  }

  render() {

    return (
      <div className="App">
        <h1>log</h1>
        <form onSubmit={this.handleSubmit}>
          <input type="radio" name="isMoneyIn" value="true" onClick={this.handleChange} /> Money In
          <br></br>
          <input type="radio" name="isMoneyIn" value="false" onClick={this.handleChange} /> Money Out
          <br></br>
          <label>Amount: $
            <input type="number" step="0.01" name="amount" onChange={this.handleChange} />
          </label>
          <br></br>
          {this.state.isWeekly ? <this.WeeklySection /> : <this.MonthlySection /> }
          <br></br>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}

export default Log;
