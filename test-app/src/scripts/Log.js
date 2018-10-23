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
      isWeekly: true,
      isMoneyIn: false,
      amount: 0,
      desc: '',
      dayOfWeek: 'monday',
      dayOfMonth: moment()._d
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDateSelect = this.handleDateSelect.bind(this);
    this.WeeklySection = this.WeeklySection.bind(this);
    this.MonthlySection = this.MonthlySection.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    // POST form data
    axios.post('/api/finance/log', {
      amount: this.state.amount,
      description: this.state.desc,
      dayOfWeek: this.state.dayOfWeek,
      date: this.state.dayOfMonth,
      isIncome: this.state.isMoneyIn
    })
    .then( (response) => {
      console.log(response);
    })
    .catch( (error) => {
      console.log(error.response);
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
          <label>
            <span>
              Day of the week:
            </span>
            <select class="select-field" name="dayOfWeek" onChange={this.handleChange}>
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
      <div className="log body">
        <h1>Log a Transaction</h1>
        <form onSubmit={this.handleSubmit}>

          <label>
              <input class="input-field" type="radio" name="isMoneyIn" value={true} onClick={this.handleChange} />
              <span class="radio">
                Money in
              </span>
          </label>

          <label>
              <input class="input-field" type="radio" name="isMoneyIn" value={false} onClick={this.handleChange} />
              <span class="radio">
                Money out
              </span>
          </label>

          <label>
            <span>
              Amount
            </span>
            $<input class="input-field" type="number" step="0.01" name="amount" onChange={this.handleChange} />
          </label>

          <label>
            <span>
              Description
            </span>
            <input type="text" class="input-field" name="desc" maxLength="50" onChange={this.handleChange} />
          </label>

          { this.state.isWeekly ? <this.WeeklySection /> : <this.MonthlySection /> }
          <br></br>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}

export default Log;
