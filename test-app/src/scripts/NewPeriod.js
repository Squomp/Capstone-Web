import React, { Component } from 'react';
import '../styles/NewPeriod.css';
import axios from 'axios';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

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

class NewPeriod extends Component {

    constructor(props) {
        super(props);
        this.state = {
            startDate: moment(),
            endDate: moment().add(7, 'days'),
            amount: props.amount,
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleClick() {
        // console.log(this.state.amount);
        // console.log(this.state.startDate.format('YYYY-MM-DD'));
        // console.log(this.state.endDate.format('YYYY-MM-DD'));
        axios.post('/api/finance/period', {
            start_date: this.state.startDate.format('YYYY-MM-DD'),
            end_date: this.state.endDate.format('YYYY-MM-DD'),
            amount: this.state.amount
        })
            .then((response) => {
                this.props.callBack();
            })
            .catch((error) => {
                console.log(error.response);
            });
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
      }

    render() {

        return (
            <div className='newPeriod'>
                <h2 style={{ textAlign: 'center' }}>Start a New Period</h2>
                <MuiThemeProvider theme={theme}>
                    <form>
                        <div>
                            <label>
                                <span>Amount $</span>
                                <input className="input-field" type="number" step="0.01" defaultValue={this.props.amount} name="amount"
                                    onChange={this.handleChange} />
                            </label>
                            <label>
                                <span>Start Date</span>
                                <DatePicker
                                    selected={this.state.startDate}
                                    onSelect={(date) => { this.setState({ startDate: date }) }} />
                            </label>
                            <label>
                                <span>End Date</span>
                                <DatePicker
                                    selected={this.state.endDate}
                                    onSelect={(date) => { this.setState({ endDate: date }) }} />
                            </label>
                            <div className='item'>
                                <div className='label'></div>
                                <Button
                                    variant="outlined" color="primary" name="newPeriod"
                                    onClick={this.handleClick}>New Period</Button>
                            </div>
                        </div>
                    </form>
                </MuiThemeProvider>
            </div>
        )
    }
}

export default NewPeriod;