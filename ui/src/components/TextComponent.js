import React from 'react';
import ReactDOM from 'react-dom'
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
// TODO
// import the state from the button Siergiey crates as ON or OFF
// that button will handle click logic and pass the state to text component
// set that button state as text  instead of text field
// remove onClick
class TextComponent extends React.Component{
        
    constructor(props){
        super(props);
        this.state = {
            // TODO - replays with clicked other button state             
            text:"OFF"
        }
        this.handleClick =this.handleClick.bind(this)
    }
   
    // on text click logic
    // TODO - remove this method after button will be created
    // button will handle click logic and pass the state to text component
    handleClick(){
        if(this.state.text !== "ON"){
            this.setState({text: "ON"})
        } else {
            this.setState({text: "OFF"})
        }
    }

    render(){
        const {text} = this.state
        return (
            <p style = {style} onClick = {this.handleClick}>{text}</p>
        );
    }
}

    ReactDOM.render(
        <TextComponent/>,
        document.getElementById('root')
    );

    export default TextComponent;
