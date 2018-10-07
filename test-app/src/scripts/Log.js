import React, { Component } from 'react';
import '../styles/Log.css';
import Navbar from './Navbar.js';

class Log extends Component {

  constructor () {
    super();
    this.state = {
      isWeekly: true,
      isMoneyIn: false,
      amount: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  WeeklySection() {
    return (
        <div>
          <label> Day of the week:
            <select> //add onChange when dynamic state values is figured out
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

  render() {

    return (
      <div className="App">
        <h1>log</h1>
        <form>
          <input type="radio" name="isMoneyIn" value="true" onClick={this.handleChange} /> Money In
          <br></br>
          <input type="radio" name="isMoneyIn" value="false" onClick={this.handleChange} /> Money Out
          <br></br>
          <label>Amount: $
            <input type="number" step="0.01" name="amount" onChange={this.handleChange} />
          </label>
          <br></br>
          {this.state.isWeekly && <this.WeeklySection /> }
          <br></br>
          <input type="submit" value="Submit"/>


        </form>
      </div>
    );
  }
}

export default Log;
