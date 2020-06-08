import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AccountBalance from './AccountBalance';
class UserProfile extends Component {


  render() {
    return (
        <div>
          <h1>User Profile</h1>

          <div>Username: {this.props.userName}</div>
          <div>Member Since: {this.props.memberSince}</div>
          <AccountBalance accountBalance={this.props.accountBalance}/>
          <br/><br/>
          <Link to="/">Back to Homepage</Link>
          
        </div>
    );
  }
}

export default UserProfile;