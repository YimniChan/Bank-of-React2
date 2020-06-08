import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Home from './components/Home';
import UserProfile from './components/UserProfile';
import Login from "./components/Login";
import Debits from './components/Debits';
import Credits from './components/Credits';
import axios from "axios";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      accountBalance: 0,
      debitArray: [],
      debitAmount:0,
      creditArray: [],
      creditAmount:0,
      currentUser: {
        userName: 'bob_loblaw',
        memberSince: '08/23/99',
      }
    }
  }

  mockLogIn = (logInInfo) => {
    const newUser = {...this.state.currentUser}
    newUser.userName = logInInfo.userName
    this.setState({currentUser: newUser})
  }

  componentDidMount() {
    //get debits information
    axios
    .get("https://moj-api.herokuapp.com/debits")
    .then((response) => {
        const data = response.data;
        console.log(data);
        let debitMoney=0;
        let total=0;
        for (let key of data) {
          debitMoney += key.amount;
          total-=key.amount;
        }
        this.setState({
          debitArray: data,
          debitAmount:debitMoney.toFixed(2),
          accountBalance:total.toFixed(2)
        });
    })
    .catch((err) =>{ 
        console.log(err);
        //this.setState({debitArray:[],});
    })
    //get credit information
    axios
    .get("https://moj-api.herokuapp.com/credits")
    .then((response) => {
        const data = response.data;
        console.log(data);
        let creditMoney=0;
        let total=Number(this.state.accountBalance);
        for (let key of data) {
          creditMoney += key.amount;
          total +=key.amount;
        }
        this.setState({
          creditArray: data,
          creditAmount:creditMoney.toFixed(2),
          accountBalance:total.toFixed(2)
        });
    })
    .catch((err) =>{ 
        console.log(err);
        // this.setState({creditArray:[]});
    })
  }

  addDebitInfo=(debit)=>{
    debit.id = Math.random().toString(36).slice(2);
    debit.date = new Date().toISOString();
    const newDebitA  = [debit,...this.state.debitArray];
    let total=Number(this.state.accountBalance);
    let debitMoney =Number(this.state.debitAmount);
    debitMoney+=debit.amount;
    total-=debit.amount;
    this.setState({
      debitArray: newDebitA,
      debitAmount:debitMoney.toFixed(2),
      accountBalance: total.toFixed(2)
    });
  }

  addCreditInfo=(credit)=>{
    credit.id = Math.random().toString(36).slice(2);
    credit.date = new Date().toISOString();
    const newCreditA  = [credit,...this.state.creditArray];
    let total=Number(this.state.accountBalance);
    let creditMoney =Number(this.state.creditAmount);
    creditMoney+=credit.amount;
    total+=credit.amount;
    this.setState({
      creditArray: newCreditA,
      creditAmount:creditMoney.toFixed(2),
      accountBalance: total.toFixed(2)
    });   
  } 

  render() {
    const HomeComponent = ()=>(<Home accountBalance={this.state.accountBalance}/> )
    const UserProfileComponent = () => (
      <UserProfile 
      accountBalance={this.state.accountBalance}
      userName={this.state.currentUser.userName} 
      memberSince={this.state.currentUser.memberSince}/>
    );
    const LoginComponent = () => (
      <Login  
      userName={this.state.currentUser}
      mockLogIn={this.mockLogIn}{...this.props}/>
    );
    
    const DebitsComponent = () => (
    <Debits 
      accountBalance={this.state.accountBalance}
      debitArray = {this.state.debitArray}
      addDebitInfo = {this.addDebitInfo}
      debitAmount = {this.state.debitAmount}
      />
    );

    const CreditsComponen = () => (
    <Credits 
      accountBalance={this.state.accountBalance}
      creditArray = {this.state.creditArray}
      addCreditInfo = {this.addCreditInfo}
      creditAmount = {this.state.creditAmount}
      />
    );

    return (
      <div className="App">
      <Router>
        <Switch>>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/UserProfile" render={UserProfileComponent}/>
          <Route exact path="/Login" render={LoginComponent} />
          <Route exact path='/Debits' render={DebitsComponent} />
          <Route exact path='/Credits' render={CreditsComponen} />
        </Switch>
      </Router>
      </div>
    );
  }
}

export default App;
