
// this page is the sign in button connection to the login page, this page will render after you click sign in button.
import React, { Component } from "react";
import  '../css/Button.css'

// pass props of button text and onClick
export default function Button(props) {

  return (   
    <button className= "button" onClick={props.handleClick}>
       {props.label}
    </button>   
  );
}
