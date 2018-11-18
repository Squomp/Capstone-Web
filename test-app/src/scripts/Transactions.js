import React, { Component } from 'react';
import '../styles/Transactions.css';
import TransactionList from './TransactionList.js';
import TransactionLineGraph from './TransactionLineGraph.js';
import Log from './Log.js';
import axios from 'axios';
import moment from 'moment';

class Transactions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            transactions: [],
            startDate: moment().format('MM/DD'),
            endDate: moment().format('MM/DD'),
            periodId: 0,
        }
        this.getTransactions = this.getTransactions.bind(this);
    }

    componentDidMount() {
        axios.get('/api/finance/current')
            .then((response) => {
                this.setState({
                    startDate: moment(response.data.data.period.start_date).format('MM/DD'),
                    endDate: moment(response.data.data.period.end_date).format('MM/DD'),
                    periodId: response.data.data.period.period_id
                })
                this.getTransactions(response.data.data.period.period_id);
            })
            .catch((error) => {
                console.log(error.response)
            })
    }

    getTransactions(pId) {
        axios.post('/api/finance/transactions', { periodId: pId })
            .then((response) => {
                this.setState({
                    transactions: response.data.data.transactions
                });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    update() {
        this.getTransactions(this.state.periodId);
    }

    render() {

        const transactions = this.state.transactions;

        return (
            <div className='transactions body'>
                <div className='transList'>
                    <h2 className="transHeader">{this.state.startDate} - {this.state.endDate}</h2>
                    <TransactionList transactions={transactions} />
                </div>
                <div className='logContainer'>
                    <TransactionLineGraph transactions={transactions} />
                    <Log callBack={this.getTransactions} pId={this.state.periodId}/>
                </div>
            </div>
        );
    }

}

export default Transactions