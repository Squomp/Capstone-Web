import React, { Component } from 'react';
import axios from 'axios';
import '../styles/Past.css';
import moment from 'moment';
import TransactionList from './TransactionList';
class Past extends Component {

    constructor() {
        super();
        this.state = ({
            periods: [],
            transactions: []
        });
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(pId) {
        axios.post('/api/finance/transactions', { periodId: pId })
            .then((response) => {
                this.setState({
                    transactions: response.data.data.transactions
                })
            })
            .catch((error) => {
                console.log(error.response);
            })
    }

    componentWillMount = () => {
        axios.get('/api/finance/past')
            .then((response) => {
                this.setState({
                    periods: response.data.data.periods
                });
            })
            .catch((error) => {
                console.log(error.response);
            })
    }

    render() {
        const periods = this.state.periods;
        const transactions = this.state.transactions;
        return (
            <div className='body'>
                <h1>Select A Period To View Transactions</h1>
                <div className='past'>
                    <div className="pastPeriods pastContainer">
                        <div className="body">
                            <h1>Past Periods</h1>
                            <div className="periods">
                                {periods.map(p => <Period key={p.period_id}
                                    period={p} onClick={this.handleClick}
                                    url={'/transactions/' + p.period_id} />)}
                            </div>
                        </div>
                    </div>
                    <div className='periodTransactions pastContainer'>
                        <div className="body">
                            <h1>Transactions</h1>
                            {transactions.length > 0 ?
                                <div className='transactionList'>
                                    <TransactionList transactions={transactions} />
                                </div>
                                : <p>No transactions in selected period</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const Period = (props) => (
    // <Link to={props.url} >
    <div className="period"
        onClick={() => props.onClick(props.period.period_id)}
        tabindex="0">
        <div className="stack left" >
            <div className='vertical'>
                <p>Start date: </p>
                <p>{moment(props.period.start_date).format('MM[/]DD[/]YYYY')}</p>
                <p>End date: </p>
                <p>{moment(props.period.end_date).format('MM[/]DD[/]YYYY')}</p>
            </div>
        </div>
        <div className="stack right">
            <div className='vertical rightColumn'>
                <p className='textRight'>Spent: </p>
                <p className='textRight'>${props.period.spent}</p>
                <p className='textRight'>Remaining: </p>
                <p className='textRight'>${props.period.remaining}</p>
            </div>
        </div>
        <hr></hr>
    </div>
    // </Link>
)

export default Past;