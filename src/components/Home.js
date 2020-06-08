import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import AccountBalance from './AccountBalance';
import "./Home.css";
    
class Home extends Component {

    render() {
    return (
        <div>
            <div>
            <img src="https://static.thenounproject.com/png/28416-200.png" alt="bank"/>
            <h1>Bank of React</h1>
            </div>
            <div className="">
            <ul>
                <li><Link to="/userProfile">User Profile</Link></li>
                <li><Link to="/Login">Login</Link></li>
                <li><Link to="/Debits">Debits</Link></li>
                <li><Link to="/Credits">Credits</Link></li>
            </ul>
            </div>
            <br /><br />
            <AccountBalance accountBalance={this.props.accountBalance}/>
            
        </div>
    );
    }
}

export default Home;