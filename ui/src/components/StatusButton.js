
// this page is the sign in button connection to the login page, this page will render after you click sign in button.
import React, { Component } from "react";
import  '../css/StatusButton.css'

/**
 *Tthe button that is placed in the status column cells
  it has props of classname for css, onClick listener that is not currently created, and the color that will change
   depending on the machine status 
 */
export default function StatusButton(props) {

  return (   
    <button className= "status-button" onClick={props.handleClick}>
    </button>   
  );
}
