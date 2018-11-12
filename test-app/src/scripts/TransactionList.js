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
        <span className="left">${props.transaction.amount}</span>
        <span className="right">{props.transaction.description}</span>
        <span className="center">{moment(props.transaction.date).format('dddd')} {moment(props.transaction.date).format('MM/DD')}</span>
        <hr></hr>
    </div>
)

export default TransactionList;