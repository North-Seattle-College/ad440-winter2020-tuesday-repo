import React, { Component  } from 'react';
//import logo from './logo.svg';
//import './App.css';

import AuthContext from './Auth'
import Api from './Api'

class Tokens extends Component {
  componentDidMount() {
    // Perform a network request on mount to easily test our setup
    Api.get('/todos')
  }

  render() {
    return (
      <div className="userinfo">
      <ul>
                        <li>
                            <a href="#">Username</a>
                        </li>
                        <li>
                            <a href="#">Profile</a>
                        </li>
                        <li>
                            <button onClick={ () => AuthContext.logOut() }>Logout</button>
                        </li>
                    </ul>
      </div>
    )
  }
}

export default Tokens;
