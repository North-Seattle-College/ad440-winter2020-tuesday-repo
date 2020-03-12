//Created by Siergiey and edited by Abdi
//This component is responsible for rendering a pop-up window with machine details.
import React from 'react';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { Input, NumericTextBox } from '@progress/kendo-react-inputs';

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
<<<<<<< Updated upstream
            onClose={this.props.cancel}
        >
            <form onSubmit={this.handleSubmit}>
                                <div style={{ marginBottom: '1rem' }}>
                    <label>
                    Image<br />
        
                  <img src={this.state.productInDetails.thumbnail} />

                   
                    </label></div>
                
                <div style={{ marginBottom: '1rem' }}>
                    <label>
                    <b>Vendor</b><br />
{this.state.productInDetails.vendor || ''}

                    </label></div>

                  
                      <div style={{ marginBottom: '1rem' }}>  
                    <label>
                    <b>Address</b><br />
      {this.state.productInDetails.street || ''}

                    </label>
                </div>
            
                    <label>
                    <b>City</b><br />
{this.state.productInDetails.city || ''}
 
                    </label>
                
                                                <div style={{ marginBottom: '1rem' }}>  
                    <label>
                    <b>Status</b><br />
{this.state.productInDetails.status_desc || ''}

                    </label>
                </div>


            </form>

                      <DialogActionsBar>
                <button
                    className="k-button"
                    onClick={this.props.cancel}>Cancel</button>
                

            </DialogActionsBar>
        </Dialog>
=======
              onClose={this.props.cancel}
          >
              <form onSubmit={this.handleSubmit}>


            <div style={{ marginBottom: '1rem' }}>
                
          <label>        
          <b>Image</b>
          <img src={this.state.productInDetails.serialnum} />
          </label></div>


            <div style={{ marginBottom: '1rem' }}>
                                          
          <label>                                
          <b>ModelNum</b><br />
          {this.state.productInDetails.modelnum || ''}
          </label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;


            <label>
            <b>LocationID</b><br />
            {this.state.productInDetails.locationID || ''}
            </label></div>


          <div style={{ marginBottom: '1rem' }}>

                      
          <label>                
          <b>Model</b><br />
          {this.state.productInDetails.model || ''}          
          </label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;


                      
          <label>
          <b>Status</b><br />
          {this.state.productInDetails.status || ''}
          </label><br /><br />

          <div style={{ marginBottom: '1rem' }}>
                                         
          <label>
          <b>Address</b><br />
          {this.state.productInDetails.address || ''}
          </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                              
          <label>
          <b>SerialNum</b><br />
          {this.state.productInDetails.serialnum || ''}
          </label></div>
          </div>
          
          <div style={{ marginBottom: '1rem' }}>         
         
          <label>   
          <b>Vendor</b><br />    
          {this.state.productInDetails.vender || ''}        
          </label></div>
          
          </form>

        <DialogActionsBar>
        <button
        className="k-button"
        
          onClick={this.props.cancel}>Cancel</button>

          </DialogActionsBar>
          </Dialog>
>>>>>>> Stashed changes
    );
  }
}

