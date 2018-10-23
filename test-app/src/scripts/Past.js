import React, { Component } from 'react';
import axios from 'axios';

class Past extends Component {

    constructor() {
        super();
        this.setState({
            periods: []
        });
    }

    componentDidMount = () => {
        axios.get('/api/finance/past')
        .then((response) => {
            console.log(response.data.data.periods);
            this.setState({periods: response.data.data.periods});
        })
        .catch((error) => {
            console.log(error.response);
        }) 
    }

    render() {
        return (
            <div className="past body">
                <h1>Past Periods</h1>
                
            </div>
        );
    }
}

export default Past;