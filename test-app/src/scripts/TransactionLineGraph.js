import React, { Component } from 'react';
import '../styles/LineGraph.css';
import { VictoryChart, VictoryBar } from 'victory';
import moment from 'moment';

class TransactionLineGraph extends Component {

    setData(transactions) {
        let dailyAmount = {};
        // loop through and add up transactions from each day, populate data
        transactions.reverse();
        transactions.forEach(t => {
            let amount = dailyAmount[t.date] ? dailyAmount[t.date] : 0;
            t.income ? amount -= t.amount : amount += t.amount;
            dailyAmount[t.date] = amount;
        });
        // for (var key in dailyAmount) {
        //     console.log(key + ' : ' + dailyAmount[key]);
        // }
        let data = [];
        for (var key in dailyAmount) {
            data.push({ x: moment(key).format('MM/DD'), y: dailyAmount[key] });
        }
        return data;
    }

    render() {
        const data = this.setData(this.props.transactions);
        return (
            <div>
                {data.length > 0 ? <VictoryChart
                    // theme={VictoryTheme.material}
                    domainPadding={{ x: 25 }}
                >
                    <VictoryBar
                        barWidth={30}
                        style={{
                            data: {
                                fill: (d) => d.y < 0 ? "#339E21" : "#AB0D26",
                                fillOpacity: 0.7,
                            },
                            labels: {
                                fontSize: 15,
                                fill: (d) => d.y < 0 ? "#339E21" : "#AB0D26",
                            }
                        }}
                        animate={{
                            duration: 500,
                            onLoad: { duration: 1000 }
                        }}
                        data={data}
                        labels={(d) => `$${d.y}`}
                    />
                </VictoryChart> : <div></div>}
            </div>
        );
    }
}

export default TransactionLineGraph;