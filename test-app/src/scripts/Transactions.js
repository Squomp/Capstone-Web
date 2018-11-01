import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import '../styles/Transactions.css';

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
                <div className="transactionList">
                    <div>
                        {transactions.map(t => <Transaction key={t.transaction_id} transaction={t} />)}
                    </div>
                </div>
            </div>
        );
    }
}

const Transaction = (props) => (
    <div className="transaction">
        <div className="top">
            <p>${props.transaction.amount} | {props.transaction.day_of_week}</p>
        </div>
        <div className="bottom">
            <p>{props.transaction.description}</p>
        </div>
    </div>
)

export default Transactions;