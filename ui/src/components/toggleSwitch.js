import React, { Component } from "react";
import Switch from "react-switch";

export default class ToggleSwitch extends Component {
  constructor() {
    super();
    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
  }
 
  handleChange(checked) {
    this.setState({ checked });
  }
 
  render() {
    return (
        <div className='toggleSwitch'>
      <label>
        <Switch onChange={this.handleChange} checked={this.state.checked} />
      </label>
         <p>The switch is <b><span>{this.state.checked ? 'on' : 'off'}</span></b>.</p>
        </div>
    );
  }
}