import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import '../styles/HomeStyle.css';
import axios from 'axios';
import {VictoryPie } from 'victory';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({ //
  palette: {
    primary: {
      light: '#208BDB',
      main: '#1C50C4',
      dark: '#2B33DB',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

class Home extends Component {

  constructor() {
    super();
    this.state = {
      data: undefined,
      username: '',
      redirectPath: '',
      shouldRedirect: false,
      pieData: [
        { x: "Spent", y: 0 },
        { x: "Remaining", y: 100 }
      ]
    }
    this.handleClick = this.handleClick.bind(this);
    this.AuthButtons = this.AuthButtons.bind(this);
    this.PeriodData = this.PeriodData.bind(this);
  }

  componentDidMount = () => {
    axios.all([
      axios.get('/api/finance/current'),
      axios.get('/api/user')
    ])
    .then(axios.spread((financeRes, userRes) => {
        this.setState({
          data: financeRes.data.data,
          username: userRes.data.data.user.username,
          pieData: [
            { x: "Spent", y: financeRes.data.data.period.spent },
            { x: "Remaining", y: financeRes.data.data.period.remaining }
          ]
        });
    }))
    .catch( (error) => {
      console.log(error.response);
    });
  }

  renderRedirect = () => {
    if (this.state.shouldRedirect && this.state.redirect !== '/') {
      return <Redirect to={this.state.redirectPath} />
    }
  }

  handleClick(e) {
      axios.post('/api/finance/period')
      .then( (response) => {
        console.log(response);
      })
      .catch( (error) => {
        console.log(error.response);
        this.render();  
      });
  }

  AuthButtons() {

    const buttonStyle = {
      fontSize: '1.5em', 
      minWidth: '10%', 
      margin: '10px'
    };

    return (
      <div className="authButtons">
        <Button 
          style={buttonStyle}
             variant="text" color="primary" component={Link} to="/login">
             Log In
        </Button>
        <Button 
          style={buttonStyle} 
            variant="text" color="primary" component={Link} to="/signup">
            Sign Up
        </Button>
      </div>
    );
  }

  PeriodData() {
    const spent = this.state.data.period.spent;
    const remaining = this.state.data.period.remaining;

    return (
      <div className="periodData">
        <div className="moneyData">
          <div className="moneyLabels">
            <p className="makeOrange">Money Spent:</p>
            <p className="makeBlue">Money Remaining:</p>
          </div>
          <div className="moneyValues">
            <p className="makeOrange">${spent}</p>
            <p className="makeBlue">${remaining}</p>
          </div>
        </div>
        <div className="pieChart">
          <VictoryPie
            data={this.state.pieData}
            animate={{ duration: 2000 }}
            colorScale={["orange", "#1CC4ED"]}
            />
        </div>
      </div>
    );
  }

  render() {
    const data = this.state.data;
    return (
      <div className="home body">
        <MuiThemeProvider theme={theme}>
        { this.renderRedirect() }
        { this.state.username ? <h1>Welcome, {this.state.username}!</h1> : <h1>Log in or sign up to use features</h1> }
        { data !== undefined ?
          (
            <div className="data">
              <div className="row"><h2>Your Current Period</h2></div>
              <div className="row">{ data.period ? <this.PeriodData /> : <h3>Start a new period</h3> }</div>
              {console.log(data.period)}
              <div className="row"><Button variant="outlined" color="primary" name="newPeriod" onClick={this.handleClick}>New Period</Button></div>
            </div>
          ) : <this.AuthButtons /> }

          </MuiThemeProvider>
      </div>
    );
  }
}

export default Home;
