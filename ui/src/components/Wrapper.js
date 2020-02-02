import React from 'react';
import TextComponent from './TextComponent';
import ToggleSwitch from './ToggleSwitch';

// This is a wrapper container
// It is a parent component to ToggleSwitch and TextComponent and it is a child component 
// of  App.js
class Wrapper extends React.Component{

    constructor(){
        super() 
        this.state = {
            checked: false,
            text: 'OFF' };
        }
    // Toggles the Wrapper component state.  This method will be passed as a required onChange
    // prop to the child component ToggleSwitch.    
    handleChange(checked) {
        this.setState({ checked: !checked});
      }

    render(){          
        return(
        <div className = "wrapper">
         {/* Passign props to children components */}
        <ToggleSwitch checked = {this.state.checked} onChange = {this.handleChange.bind(this)} />
        <div margin = "50px"></div>
         <TextComponent text = {this.state.checked ? 'ON' : 'OFF'}/>
             {/* Passing the current state as prop to the TextComponent the App.js state . */}       

        </div>
        )
    }
}

export { Wrapper as default };
