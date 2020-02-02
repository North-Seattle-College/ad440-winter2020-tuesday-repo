import React from 'react';

// stylying for the p1. Placed here because it is needed temporary
// TODO - remove this style later when not needed
const style = {
    fontSize: '40px',
    padding: '10px',
    fontWeight: 'bold',
    textAlign: 'center',
    border: '5px solid pink'
  };
// This is a simple text component that changes text when it switches state 
// it receives the prop 'text' from the parent component Wrapper.js and
// shows if the switch is ON or OFF
class TextComponent extends React.Component{        
   
    render(){
        return (
            <div className = "Text">
                <p style = {style}>{this.props.text}</p>
            </div>
        );
    }
}

 export default TextComponent;
