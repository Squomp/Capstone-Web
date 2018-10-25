import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Past.css';
import moment from 'moment';

class Past extends Component {

    constructor() {
        super();
        this.state = ({
            periods: []
        });
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount = () => {
        axios.get('/api/finance/past')
            .then((response) => {
                this.setState({ periods: response.data.data.periods });
            })
            .catch((error) => {
                console.log(error.response);
            })
    }

    handleClick = (e) => {
        console.log('clicked');
    }

    render() {
        const periods = this.state.periods;
        console.log(periods);
        // console.log(moment(periods[0].start_date));
        return (
            <div className="past body">
                <h1>Past Periods</h1>
                <div className="periods">
                    {periods.map(p => <Period key={p.period_id} period={p} onClick={this.handleClick} />)}
                </div>
            </div>
        );
    }
}

const Period = (props) => (
    <Link to="/transactions">
        <div className="period">
            <div className="vertical">
                <p className="left">Start date: {moment(props.period.start_date).format('MM[/]DD[/]YYYY')}</p>
                <p className="left">End date: {moment(props.period.end_date).format('MM[/]DD[/]YYYY')}</p>
            </div>
            <div className="vertical right">
                <p>Spent: ${props.period.spent}</p>
                <p>Remaining: ${props.period.remaining}</p>
            </div>
            <hr></hr>
        </div>
    </Link>
)

export default Past;