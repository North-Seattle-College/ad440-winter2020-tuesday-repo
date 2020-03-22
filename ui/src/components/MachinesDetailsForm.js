//Created by Siergiey and edited by Abdi
//This component is responsible for rendering a pop-up window with machine details.
import React from 'react';
import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
// import { Input, NumericTextBox } from '@progress/kendo-react-inputs';
// import {Link} from 'react-router';
import CustomStatusCell from "./CustomStatusCell"




export default class MachinesDetailsForm extends React.Component {
    
    

  constructor(props) {
      super(props);
      this.state = {
          productInDetails: this.props.dataItem || null
      };
  }
    
        customData = [
        { color: 'green' },
        { color: 'yellow' },
        { color: 'red' }
    ];

    MyCustomCell = (props) => <CustomStatusCell {...props} myColorsProp = {this.customData}
    />
    
    
  handleSubmit(event) {
      event.preventDefault();
  }

  onDialogInputChange = (event) => {
      let target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.props ? target.props.name : target.name;

      const edited = this.state.productInDetails;
      edited[name] = value;

      this.setState({
          productInDetails: edited
      });
  }
  
 

  render() {
      
     const mystyle = {
      color: "black",
      backgroundColor:"${this.state.productInDetails.status}$",
      padding: "10px",
      fontFamily: "Arial"
     };
      
      
      return (
        <Dialog

              onClose={this.props.cancel}

          >
              <form onSubmit={this.handleSubmit}>




          <div style={{ marginBottom: '1rem', float:'left', width:400, marginRight:50}}>

          {this.state.productInDetails.images===" " || this.state.productInDetails.images===null ||
          this.state.productInDetails.images==="null"
          ? <img style={{width:400}} alt = "" src='https://images-na.ssl-images-amazon.com/images/I/81s%2Btw0hwzL.__AC_SY300_QL70_ML2_.jpg'/>
          : <img style={{width:400}} alt = "" src={this.state.productInDetails.images} />}


          </div>

            <div style={{float:'right', maxWidth:'60%'}}>
            <div style={{ marginBottom: '1rem' }}>

          <label>
          <b>ModelNum</b><br />
          {this.state.productInDetails.modelnum || ''}
          </label> 
                    <div >
          <label>
          <b>Model</b><br />
          {this.state.productInDetails.model || ''}
          </label></div>

          <div>

            <label>
            <b>LocationID</b><br/>
            {this.state.productInDetails.address || ''}
            </label></div>
                    
          <div >
          <label>
          <b>Address</b><br />
          {this.state.productInDetails.street || ''}<br/>
          {this.state.productInDetails.city || ''}{", "}  
          {this.state.productInDetails.state || ''}{" "}
          {this.state.productInDetails.zip || ''}<br/>
          {<b>Phone: </b>}{this.state.productInDetails.phone || ''}<br/>
          </label></div>



          <label>
          <b>Status</b><br />
          
         <div style={{backgroundColor:"{this.state.productInDetails.Status}"}}>
        
          
             {this.state.productInDetails.Status}<br/>
      </div>
          
          {this.state.productInDetails.StatusDescription || ''}
          
          </label></div>


          <div style={{ marginBottom: '1rem' }}>

 



          <label>
          <b>SerialNum</b><br />
          {this.state.productInDetails.serialnum || ''}
          </label></div>

   

          <div >

          <label>
          <b>Vendor</b><br />
          {this.state.productInDetails.vendor || ''}
          </label>

          </div>

          </div>

          </form>


        <DialogActionsBar>
        <button
        className="k-button"

          onClick={this.props.cancel}>Cancel</button>

          </DialogActionsBar>
          </Dialog>


    );
  }
}
