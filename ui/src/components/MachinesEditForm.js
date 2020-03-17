
import React from 'react';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { Input, NumericTextBox } from '@progress/kendo-react-inputs';

export default class MachinesEditForm extends React.Component {
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
        console.log("editedProperty[propertyName]: ", editedProperty[propertyName])

        
    //  if(target.props.name === "vendor"){
    //     editedProperty[vendor] = value;
    //  }

    //   if(target.props.name === "street"){
    //     editedProperty.address = value;
    //   }
    //   if(target.props.name == "status_desc"){
    //     editedProperty.status = value;
    //   }

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
                    Vendor<br />
                    <Input
                        type="text"
                        name="vendor"
                        value={this.state.productInEdit.vendor || ''}
                        onChange={this.onDialogInputChange}
                    />
                    </label></div>


                      <div style={{ marginBottom: '1rem' }}>
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
