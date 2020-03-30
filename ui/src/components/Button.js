// this page is the sign in button connection to the login page, this page will render after you click sign in button.
import React, { Component } from "react";
import  '../css/Button.css'

/**
 * Functional button component
 * @param {} props
 */
export default function Button(props) {
// pass props of button text and onClick
  return (
    <button className= "work-areas" onClick={props.handleClick}>
       {props.label}
    </button>
  );
}
