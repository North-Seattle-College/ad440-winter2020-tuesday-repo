
// this page is the sign in button connection to the login page, this page will render after you click sign in button.
import React, { Component } from "react";
import AdalConfig from './AdalConfig';
import AuthContext from './Auth';
import logo from './logo.png';
import '../css/App.css';


export default class Login extends Component {
  sign(){
    AuthContext.handleWindowCallback()

    // Extra callback logic, only in the actual application, not in iframes in the app
    if ((window === window.parent) && window === window.top && !AuthContext.isCallback(window.location.hash)) {
      // Having both of these checks is to prevent having a token in localstorage, but no user.
      if (!AuthContext.getCachedToken(AdalConfig.clientId) || !AuthContext.getCachedUser()) {
        AuthContext.login()
  }
}
}

  render() {
    return (

        <div className='login'>
            <img src={logo} className="logo" alt="logo"/>
            <button className='btn' onClick={this.sign}>Sign in</button>
        </div>

    );
  }
}
