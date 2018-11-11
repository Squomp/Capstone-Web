import React, { Component } from 'react';
import '../styles/TransactionList.css';
import moment from 'moment';

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
        <div className="center">{moment(props.transaction.date).format('dddd')} {moment(props.transaction.date).format('MM/DD')}</div>
    </div>
)

export default TransactionList;