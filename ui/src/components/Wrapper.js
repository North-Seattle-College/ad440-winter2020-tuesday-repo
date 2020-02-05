import React, { useMemo, useState, useEffect } from "react";

import Table from "./Table";
import TextComponent from './TextComponent';
import ToggleSwitch from './ToggleSwitch';

// This is a wrapper container
// It is a parent component to ToggleSwitch and TextComponent and it is a child component 
// of  App.js
const columns =  [
        {
            Header: "Machine",
            accessor: "id"
        },
        {
            Header: "Vendor",
            accessor: "vendor"
        },
        {
            Header: "Adress",
            accessor: "id"
        },
        {
            Header: "status",
            accessor: "status"
        }
    ]


class Wrapper extends React.Component{

    constructor(){
        super() 
        this.state = {
            checked: false,
            text: 'OFF' ,
            data: [
                { id: 1, vendor: 'Microsoft', address: '5000 148th Ave NE, Redmond, WA 98052', status: 'red'},
                { id: 1, vendor: 'North Seattle College', address: '9600 College Way N, WA 98103', status: 'red'},
                { id: 1, vendor: 'Central Seattle College', address: '539 12th Ave, Redmond, WA 98052', status: 'red'},
                { id: 1, vendor: 'Some Fun Office', address: '50 Occidental Ave S, WA 98124', status: 'red'},
                { id: 1, vendor: 'Fidelity', address: '4600 5th Ave, Seattle, WA 980104', status: 'red'},
                { id: 1, vendor: 'Amazon Spheres', address: '5000 148th Ave NE, Redmond, WA 98052', status: 'red'}
            
            ]};
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
