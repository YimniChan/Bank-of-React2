import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import AccountBalance from './AccountBalance';
import {Link} from 'react-router-dom';

class Login extends Component {
  constructor () {
    super()
    this.state = {
      user: {
        userName: '',
        password: ''
      },
      redirect: false
    }
  }

  handleChange = (e) => {
    const updatedUser = {...this.state.user}
    const inputField = e.target.name
    const inputValue = e.target.value
    updatedUser[inputField] = inputValue

    this.setState({user: updatedUser})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.mockLogIn(this.state.user)
    this.setState({redirect: true})
  }

  render () {
    if (this.state.redirect) {
      return (<Redirect to="/userProfile"/>)
    }

    return (
      <div>
        <div >
            <h1 className="">Login</h1>
            <Link to="/">Back to Homepage</Link>
        </div>
        <br/>
        <form onSubmit={this.handleSubmit}>
          <div><p>
            <label htmlFor="userName">User Name: </label>
            <input type="text" name="userName" 
                    onChange={this.handleChange} 
                    value={this.state.user.userName}/>
          </p></div>
          <div><p>
            <label htmlFor="password">Password: </label>
            <input type="password" name="password" />
            </p></div>
          <button>Log In</button>
        </form>
      </div>
    )
  }
}

export default Login