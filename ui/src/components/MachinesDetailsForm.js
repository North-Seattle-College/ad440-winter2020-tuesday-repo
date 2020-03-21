//Created by Siergiey and edited by Abdi
//This component is responsible for rendering a pop-up window with machine details.
import React from 'react';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { Input, NumericTextBox } from '@progress/kendo-react-inputs';
import {Link} from 'react-router';

export default class MachinesDetailsForm extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          productInDetails: this.props.dataItem || null
      };
  }
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
      return (
        <Dialog

              onClose={this.props.cancel}

          >
              <form onSubmit={this.handleSubmit}>




          <div style={{ marginBottom: '1rem', float:'left', maxHeight:400, marginRight:50, }}>

          {this.state.productInDetails.images
          ? <img style={{width:400}} src={this.state.productInDetails.images}/>
          : <img style={{width:400}} src='https://media.4rgos.it/i/Argos/8477958_R_Z001A?w=750&h=440&qlt=70'/> }         
          
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






          <div>

          <label>
          <b>Status</b><br />
          {this.state.productInDetails.status || ''}<br/>
          {this.state.productInDetails.statusDesc || ''}
          
          </label></div>

     


                              
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


