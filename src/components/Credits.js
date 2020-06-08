import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import AccountBalance from './AccountBalance';

class Credits extends Component {
    constructor (props) {
        super(props);
        this.state = {
            accountBalance: this.props.accountBalance,
        //   creditAmount: this.props.creditAmount,
            creditArray: this.props.creditArray,
            newCredit:{
                id: "",
                description: "",
                amount: "",
                date: "",
              },
        }
    }

    handleInput=(e)=>{
     const newRecordName = e.target.name;
     const newRecordValue = e.target.value;
     const newCredit = {...this.state.newCredit};
     newCredit[newRecordName] = newRecordValue;
     if (newRecordName === "amount") {
        newCredit.amount = Number(newRecordValue);
      }
     this.setState({newCredit})
    }

    addCredit = (e) => {
        e.preventDefault();  
        this.props.addCreditInfo(this.state.newCredit);
    };
    
    render() {
        let display = (
            this.props.creditArray.map((creditInfo) => {
                return (
                <div className="CreditResult">
                    <div>{creditInfo.description}</div>
                    <div>Amount: $ {creditInfo.amount}</div>
                    <div>Date: {creditInfo.date}</div>
                    <br />
                </div> 

                );
            })
        )
        return (
            <div className="Credit">

                <h1>Credits Account</h1>
                <AccountBalance accountBalance={this.props.accountBalance}/>
                <p>Total Credit: ${this.props.creditAmount} </p>
                <Link to="/">Back to Homepage</Link>
                <div>
                    <h3>Add Credit Record</h3>
                    <p><label>Description:</label>
                    <input type="text" name="description" onChange={this.handleInput}/>{"  "}
                    <label>Credit Amount:</label>
                    <input type="number" name="amount" onChange={this.handleInput}/>{"  "}
                    <button onClick={this.addCredit}>Add</button></p>
                </div>

                <br />
                <div className="result">
                    <h2>Credit Record</h2>     
                    {display}
                </div>
            </div>
        )
    }
}

export default Credits