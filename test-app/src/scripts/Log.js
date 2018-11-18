import React, { Component } from 'react';
import axios from 'axios';
import '../styles/Log.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import moment from 'moment';

class Log extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isWeekly: true,
      isMoneyIn: undefined,
      amount: 0,
      desc: '',
      dayOfWeek: 'monday',
      date: moment()
    };
    this.handleChange = this.handleChange.bind(this);
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
      date: this.state.date.format('YYYY-MM-DD'),
      isIncome: this.state.isMoneyIn
    })
      .then((response) => {
        this.setState({
          isMoneyIn: undefined,
          amount: 0,
          desc: '',
          data: moment()
        })
        this.props.callBack(this.props.pId);
        console.log(response);
        // let path = `/`;
        // this.props.history.push(path);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
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
      <div className="log">
        <h1>Log a Transaction</h1>
      <MuiThemeProvider theme={theme}>
        <form onSubmit={this.handleSubmit}>
          <div className='radioButtons'>
            <div>
              <input className="input-field" type="radio" name="isMoneyIn" value={true} onClick={this.handleChange} />
              <span class="radio">
                Money in
              </span>
            </div>
            <div>
              <input className="input-field" type="radio" name="isMoneyIn" value={false} onClick={this.handleChange} />
              <span className="radio">
                Money out
              </span>
            </div>
          </div>
          <div className='form'>
            <div className='items'>
              <div className='item'>
                <div className='label'>Amount $</div>
                <div className='input'>
                  <input class="input-field" type="number" step="0.01" name="amount" onChange={this.handleChange} />
                </div>
              </div>
              <div className='item'>
                <div className='label'>Description</div>
                <div className='input'>
                  <input type="text" class="input-field" name="desc" maxLength="50" onChange={this.handleChange} />
                </div>
              </div>
              <div className='item'>
                <div className='label'>Date</div>
                <div className='input'>
                  <DatePicker
                    selected={this.state.date}
                    onSelect={((date) => this.setState({ date: date }))} />
                </div>
              </div>
            </div>
          </div>
          <input type="submit" value="Submit" />
        </form>
      </MuiThemeProvider>
      </div>
    );
  }
}

const theme = createMuiTheme({
  palette: {
      primary: {
          light: '#208BDB',
          main: '#1C50C4',
          dark: '#2B33DB',
          contrastText: '#fff',
      },
      secondary: {
          light: '#ff7961',
          main: '#f44336',
          dark: '#ba000d',
          contrastText: '#000',
      },
  },
});

export default Log;
