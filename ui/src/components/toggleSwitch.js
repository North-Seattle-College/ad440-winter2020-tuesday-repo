import React, { Component } from "react";
import Switch from "react-switch";

{/* 
  Created by Siergiey
  Modified by Iryna 1-30
  This is a simple toggle switch for Sprint 1.
  For this switch to work, we have to import React libraries "react-switch"
  class for the toggle switch.
*/}

export default class ToggleSwitch extends Component {
 // Links the checked prop passed from the parent class Wrapper.js to the Toggle
  handleChange(){
    this.props.onChange(this.props.checked);
  }

  render() {  
    return (
        <div className='toggleSwitch'>
      <label>
        <Switch checked={this.props.checked} onChange = {this.handleChange.bind(this)}  />
      </label>
        </div>
    );
  }
}