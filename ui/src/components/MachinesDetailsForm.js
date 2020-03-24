//Created by Siergiey and edited by Abdi
//This component is responsible for rendering a pop-up window with machine details.
import React from 'react';
// import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
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
         width:200,
         height:40,
         borderRadius:10

     };


      return (
        <Dialog

              onClose={this.props.cancel}

          >
              <form onSubmit={this.handleSubmit}>




          <div style={{ marginBottom: '1rem', float:'left', width:400, marginRight:50}}>

          {this.state.productInDetails.ModelPhoto===" " ||
          this.state.productInDetails.ModelPhoto===null ||
          this.state.productInDetails.ModelPhoto==="null"||
          this.state.productInDetails.ModelPhoto===" null"||
          this.state.productInDetails.ModelPhoto.includes("http")===false
          ? <img style={{width:400}} alt = "" src='https://images-na.ssl-images-amazon.com/images/I/81s%2Btw0hwzL.__AC_SY300_QL70_ML2_.jpg'/>
          : <img style={{width:400}} alt = "" src={this.state.productInDetails.ModelPhoto} />}


          </div>

        <div style={{float:'right', maxWidth:'60%', width:200, textAlign:'left'}}>

          <div>
          <label>
          <b>MachineID</b><br />
          {this.state.productInDetails.MachineID || ''}
          </label>
          </div>


          <div>
          <label>
          <b>ModelNum</b><br />
          {this.state.productInDetails.ModelNum || ''}
          </label>
          </div>


          <div>
          <label>
          <b>Model</b><br />
          {this.state.productInDetails.Model || ''}
          </label>
          </div>

          <div>
          <label>
          <b>SerialNum</b><br />
          {this.state.productInDetails.SerialNum || ''}
          </label>
          </div>

          <div>
          <label>
          <b>LocationID</b><br/>
          {this.state.productInDetails.LocationID || ''}
          </label>
          </div>

          <div>
          <label>
          <b>Vendor</b><br />
          {this.state.productInDetails.Vendor || ''}
          </label>
          </div>

          <div>
          <label>
          <b>Address</b><br />
          {this.state.productInDetails.street || ''}<br/>
          {this.state.productInDetails.city || ''}{", "}
          {this.state.productInDetails.state || ''}{" "}
          {this.state.productInDetails.zip || ''}<br/>
          {<b>Phone: </b>}{this.state.productInDetails.phone || ''}<br/>
          </label>
          </div>

          <div>
          <label>
          <b>Status</b><br />

          {this.state.productInDetails.Status===null ||
           this.state.productInDetails.Status===""
          ? <img style={mystyle} alt = "" src={require('./colors/white.png')} />
          : this.state.productInDetails.Status.toLowerCase()==='green'
          ? <img style={mystyle} alt = "" src={require('./colors/green.png')} />
          :this.state.productInDetails.Status.toLowerCase()==='yellow'
          ? <img style={mystyle} alt = "" src={require('./colors/yellow.png')} />
          : this.state.productInDetails.Status.toLowerCase()==='red'
          ? <img style={mystyle} alt = "" src={require('./colors/red.png')} />
          : <img style={mystyle} alt = "" src={require('./colors/red.png')} />
          } <br/>


          {this.state.productInDetails.StatusDescription===null
          ?this.state.productInDetails.StatusDescription          :this.state.productInDetails.StatusDescription.charAt(0).toUpperCase()+this.state.productInDetails.StatusDescription.slice(1).toLowerCase()}

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
