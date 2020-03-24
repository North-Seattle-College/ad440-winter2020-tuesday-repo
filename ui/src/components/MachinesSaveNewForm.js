
import React from 'react';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
// import { Input, NumericTextBox } from '@progress/kendo-react-inputs';
import { Input } from '@progress/kendo-react-inputs';

export default class MachinesSaveNewForm extends React.Component {
  constructor(props) {
      super(props);
      // have a state say if its a edit or save form
      this.state = {
          productInEdit: this.props.dataItem || null
      };
  }
  handleSubmit(event) {
      event.preventDefault();
  }

  onDialogInputChange = (event) => {
      let target = event.target;
      console.log("Target" , target)
      const value = target.type === 'checkbox' ? target.checked : target.value;
      console.log("Target Value ", value );
      const propertyName = target.props ? target.props.name : target.name;

      const editedProperty = this.state.productInEdit;
      console.log ("edited property: ", editedProperty );
      console.log("Edited adress ", editedProperty.address, "Edited name ", editedProperty.name, "Edited status ", editedProperty.status);
      console.log("Product in Edit = this.dataItem ", this.state);



     editedProperty[propertyName] = value;


    // console.log("editedProperty[propertyName]: ", editedProperty[propertyName])

      console.log("Edited[name] ," , editedProperty[propertyName])

      this.setState({
          productInEdit: editedProperty
      });
  }

  render() {

      return (
        <Dialog
            onClose={this.props.cancel}
        >
            <form onSubmit={this.handleSubmit}>

                <div style={{ marginBottom: '1rem' }}>
                    <label>
                    Vendor ID<br />
                    <Input
                        type="text"
                        name="VendorID"
                        value={this.state.productInEdit.VendorID || ''}
                        onChange={this.onDialogInputChange}
                    />
                    </label></div>


                      <div style={{ marginBottom: '1rem' }}>
                    <label>
                    Location ID<br />
                    <Input
                        type="text"
                        name="LocationID"
                        value={this.state.productInEdit.LocationID || ''}
                        onChange={this.onDialogInputChange}
                    />
                    </label>
                </div>

                 <div style={{ marginBottom: '1rem' }}>
                    <label>
                    Model<br />
                    <Input
                        type="text"
                        name="Model"
                        value={this.state.productInEdit.Model || ''}
                        onChange={this.onDialogInputChange}
                    />
                    </label></div>


                <div style={{ marginBottom: '1rem' }}>
                    <label>
                    Model Number<br />
                    <Input
                        type="text"
                        name="ModelNum"
                        value={this.state.productInEdit.ModelNum || ''}
                        onChange={this.onDialogInputChange}
                    />
                    </label></div>


                    <div style={{ marginBottom: '1rem' }}>
                    <label>
                    Serial Number<br />
                    <Input
                        type="text"
                        name="SerialNum"
                        value={this.state.productInEdit.SerialNum || ''}
                        onChange={this.onDialogInputChange}
                    />
                    </label></div>

                    <div style={{ marginBottom: '1rem' }}>
                    <label>
                    Model photo<br />
                    <Input
                        type="text"
                        name="ModelPhoto"
                        value={this.state.productInEdit.ModelPhoto || ''}
                        onChange={this.onDialogInputChange}
                    />
                    </label></div>

            </form>
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
