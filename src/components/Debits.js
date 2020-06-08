import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import AccountBalance from './AccountBalance';

class Debits extends Component {
    constructor (props) {
        super(props);
        this.state = {
            accountBalance: this.props.accountBalance,
            debitData: this.props.debits,
            newDebit: {
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
        const newDebit = {...this.state.newCredit};
        newDebit[newRecordName] = newRecordValue;
        if (newRecordName === "amount") {
            newDebit.amount = Number(newRecordValue);
         }
        this.setState({newDebit})
       }
   
    addDebit = (e) => {
        e.preventDefault();  
        this.props.addDebitInfo(this.state.newDebit);
    };

    render() {
        let display = (
            this.props.debitArray.map((debitInfo) => {
                return (
                <div className="DebitResult">
                    <div>{debitInfo.description}</div>
                    <div>Amount: $ {debitInfo.amount}</div>
                    <div>Date: {debitInfo.date}</div>
                    <br />
                </div>
                );
            })
        )
        return (
            <div className="Credit">

                <h1>Debits Account</h1>
                <AccountBalance accountBalance={this.props.accountBalance}/>
                <p>Total Debit: ${this.props.debitAmount} </p>
                <Link to="/">Back to Homepage</Link>
                <div>
                    <h3>Add Debit Record</h3>
                    <p><label>Description:</label>
                    <input type="text" name="description" onChange={this.handleInput}/>{"  "}
                    <label>Debit Amount:</label>
                    <input type="number" name="amount" onChange={this.handleInput}/>{"  "}
                    <button onClick={this.addDebit}>Add</button></p>
                </div>
                
                <br />
                <div className="result">
                    <h2>Debit Record</h2>     
                    {display}
                </div>
            </div>
        )
    }
}

export default Debits