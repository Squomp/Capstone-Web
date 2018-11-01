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

    render() {
        const periods = this.state.periods;
        return (
            <div className="past body">
                <h1>Past Periods</h1>
                <div className="periods">
                    {periods.map(p => <Period key={p.period_id} period={p} url={'/transactions/' + p.period_id}/>)}
                </div>
            </div>
        );
    }
}

const Period = (props) => (
    <Link to={props.url} >
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