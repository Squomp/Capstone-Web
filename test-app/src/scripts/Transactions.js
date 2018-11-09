import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import '../styles/Transactions.css';
import TransactionList from './TransactionList.js';

class Transactions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            start_date: undefined,
            end_date: undefined,
            transactions: []
        };
    }

    componentWillMount = () => {
        const pId = this.props.match.params.pId;
        axios.post('/api/finance/transactions', { periodId: pId })
            .then((response) => {
                this.setState({
                    start_date: response.data.data.transactions[0].start_date,
                    end_date: response.data.data.transactions[0].end_date,
                    transactions: response.data.data.transactions
                });
            })
            .catch((error) => {
                console.log(error.response);
            })
    }

    render() {
        const transactions = this.state.transactions;
        console.log(transactions);
        return (
            <div className="transactions body">
                <h1>{moment(this.state.start_date).format('MM[/]DD[/]YYYY')} - {moment(this.state.end_date).format('MM[/]DD[/]YYYY')}</h1>
                <TransactionList transactions={transactions} />
            </div>
        );
    }
}

export default Transactions;