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

const MoneyIn = (props) => (
    <span className='amount green'>+${props.transaction.amount}</span>
)

const MoneyOut = (props) => (
    <span className='amount red'>-${props.transaction.amount}</span>
)

const Transaction = (props) => (
    <div className="transaction">
    <div className='top'>
        {props.transaction.income ?
            <MoneyIn transaction={props.transaction} />
            : <MoneyOut transaction={props.transaction} />}
        <span className="date">{moment(props.transaction.date).format('dddd')} {moment(props.transaction.date).format('MM/DD')}</span>
        </div>
        <div className="desc">{props.transaction.description}</div>
        <hr></hr>
    </div>
)

export default TransactionList;