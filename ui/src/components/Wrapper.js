import React from 'react';
import ReactDOM from 'react-dom'
import TextComponent from './TextComponent';
import ToggleSwitch from './toggleSwitch';


const style = {
    fontSize: '40px',
    padding: '10px',
    fontWeight: 'bold',
    textAlign: 'center',
    border: '5px solid pink'
  };
// This is a wrapper container
class Wrapper extends React.Component{

    constructor(){
        super()    
    }

    render(){      
        return(
        <div className = "wrapper">
             {/* Should change the App.js state when clicked. */}
         <ToggleSwitch/>
             {/* Passing the current state as prop to the TextComponent the App.js state . */}       
        </div>
        )
    }    
}

export { Wrapper as default };