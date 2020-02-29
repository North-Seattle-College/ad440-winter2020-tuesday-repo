//Created by Siergiey
import React from 'react';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { Input, NumericTextBox } from '@progress/kendo-react-inputs';

{/*this component is responsible for generating the pop-up form for ADDing and EDITING machines */}
export default class MachinesEditForm extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          productInEdit: this.props.dataItem || null
      };
  }
  handleSubmit(event) {
      event.preventDefault();
  }

  /*stored value for the form*/
  onDialogInputChange = (event) => {
      let target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.props ? target.props.name : target.name;

      const edited = this.state.productInEdit;
      edited[name] = value;

      this.setState({
          productInEdit: edited
      });
  }
  
  /*The pop-up window is being generated here*/
  render() {
      return (
        <Dialog
            onClose={this.props.cancel}
        >
            <form onSubmit={this.handleSubmit}>

          {/*All the variables for the form are being generated here*/}
                <div style={{ marginBottom: '1rem' }}>
                    {/*vendor field*/}
                    <label>
                    Vendor<br />
                    <Input
                        type="text"
                        name="vendor"
                        value={this.state.productInEdit.vendor || ''}
                        onChange={this.onDialogInputChange}
                    />
                    </label></div>


                      <div style={{ marginBottom: '1rem' }}>
                    {/*Address field*/}
                    <label>
                    Address<br />
                    <Input
                        type="text"
                        name="address"
                        value={this.state.productInEdit.address || ''}
                        onChange={this.onDialogInputChange}
                    />
                    </label>
                </div>
                      
                     <div style={{ marginBottom: '1rem' }}>
                    {/*Status field*/}
                    <label>
                    Status<br />
                    <Input
                        type="text"
                        name="status"
                        value={this.state.productInEdit.status || ''}
                        onChange={this.onDialogInputChange}
                    />
                    </label>
                </div>



            </form>
            {/*actions for the form buttons*/}
            <DialogActionsBar>
                <button
                    className="k-button"
                    onClick={this.props.cancel}>Cancel</button>

            <button
                    className="k-button k-primary"
                    onClick={this.props.save}>Save</button>
            </DialogActionsBar>
        </Dialog>
    );
  }
}
