
// this page is the sign in button connection to the login page, this page will render after you click sign in button.
import React, { Component } from "react";
import '../css/App.css';


export default  class TopBar extends Component {

  render() {
    return (

        <div className='login'>
            <button className='btn' onClick={this.sign}>Sign in</button>
        </div>

    );
  }
}
