import React, { Component } from "react";
import Switch from "react-switch";
import TextComponent from './TextComponent'

{/*Created by Siergiey
This is a simple toggle switch for Sprint 1.
For this switch to work, we have to import React libraries "react-switch"

class for the toggle switch.*/}

export default class ToggleSwitch extends Component {
  constructor() {
    super();
      {/*State for the toggle switch. By default it is "off" so the state has to be "false".*/}
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
        {/* Text component changes text ON and OFF based on the toggle state */}
        <TextComponent text = {this.state.checked ? 'ON' : 'OFF'}/>
      </label>
        </div>
    );
  }
}