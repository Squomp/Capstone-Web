import React, { Component } from 'react';
import '../styles/TransactionList.css';

class TransactionList extends Component {

    render() {
        return (
            <div className="transactionList">
                <div className="list">
                    {this.props.transactions.map(t => <Transaction key={t.transaction_id} transaction={t} />)}
                </div>
            </div>
        )
    }
}

const Transaction = (props) => (
    <div className="transaction">
        <div className="left">${props.transaction.amount}</div>
        <div className="right">{props.transaction.description}</div>
        <div className="center">{props.transaction.day_of_week}</div>
    </div>
)

export default TransactionList;