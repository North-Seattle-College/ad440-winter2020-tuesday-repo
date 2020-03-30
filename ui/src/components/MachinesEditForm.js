
import React from 'react';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { Input } from '@progress/kendo-react-inputs';

export default class MachinesEditForm extends React.Component {
  constructor(props) {
      super(props);
      // have a state say if its a edit or save form
      this.state = {
          productInRealEdit: this.props.dataItem || null,
          dataItemID: this.props.dataItem.MachineID
      };
  }
  handleSubmit(event) {
      event.preventDefault();
  }


  onDialogInputChange = (event) => {
    let target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const propertyName = target.props ? target.props.name : target.name;

    const editedProperty = this.state.productInRealEdit;

       editedProperty[propertyName] = value;
       editedProperty.MachineID = this.props.dataItem.MachineID;

      this.setState({
        productInRealEdit: this.props.dataItem
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
                        value={this.state.productInRealEdit.VendorID || ''}
                        onChange={this.onDialogInputChange}
                    />
                    </label>
                    &nbsp;
                    <label>
                    Location ID<br />
                    <Input
                        type="text"
                        name="LocationID"
                        value={this.state.productInRealEdit.LocationID || ''}
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
                        value={this.state.productInRealEdit.Model || ''}
                        onChange={this.onDialogInputChange}
                    />
                    </label>
                    &nbsp;
                    <label>
                    Model Number<br />
                    <Input
                        type="text"
                        name="ModelNum"
                        value={this.state.productInRealEdit.ModelNum || ''}
                        onChange={this.onDialogInputChange}
                    />
                    </label></div>


                    <div style={{ marginBottom: '1rem' }}>
                    <label>
                    Serial Number<br />
                    <Input
                        type="text"
                        name="SerialNum"
                        value={this.state.productInRealEdit.SerialNum || ''}
                        onChange={this.onDialogInputChange}
                    />
                    </label>
                    &nbsp;
                    <label>
                    Model photo<br />
                    <Input
                        type="text"
                        name="ModelPhoto"
                        value={this.state.productInRealEdit.ModelPhoto || ''}
                        onChange={this.onDialogInputChange}
                    />
                    </label></div>

                    <div style={{ marginBottom: '1rem' }}>
                    <label>
                    Status<br />
                    <Input
                        type="text"
                        name="Status"
                        value={this.state.productInRealEdit.Status || ''}
                        onChange={this.onDialogInputChange}
                    />
                    </label>
                    &nbsp;
                    <label>
                      Status Desccription <br />
                    <Input
                        type="text"
                        name="StatusDescription"
                        value={this.state.productInRealEdit.StatusDescription || ''}
                        onChange={this.onDialogInputChange}
                    />
                    </label></div>

            </form>
            <DialogActionsBar>
                <button
                    className="k-button"
                    onClick={this.props.cancel}>Cancel</button>
                    &nbsp;

            <button
                    className="k-button k-primary"
                    onClick={()=> this.props.edit(this.props.editedProductID)}>Edit</button>
            </DialogActionsBar>
        </Dialog>
    );
  }
}
