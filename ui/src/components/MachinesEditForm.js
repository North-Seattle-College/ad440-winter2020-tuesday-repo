
import React from 'react';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { Input } from '@progress/kendo-react-inputs';

export default class MachinesEditForm extends React.Component {
  constructor(props) {
      super(props);
      // have a state say if its a edit or save form
      this.state = {
          productInRealEdit: this.props.dataItem || null
      };
      // prints the dataitem json
      console.log("this.props.dataItem ", this.props.dataItem);
  }
  handleSubmit(event) {
      event.preventDefault();
  }

  

 

  onDialogInputChange = (event) => {
    console.log(" On change this.props.dataItem ", this.props.dataItem);
      let target = event.target;
      console.log("Target" , target)
      const value = target.type === 'checkbox' ? target.checked : target.value;
      console.log("Target Value ", value );
      const propertyName = target.props ? target.props.name : target.name;

      const editedProperty = this.state.productInRealEdit;
      
    //   console.log ("edited property: ", editedProperty );
    //   console.log("Edited adress ", editedProperty.address, "Edited name ", editedProperty.name, "Edited status ", editedProperty.status);
      console.log("Product in Edit = this.dataItem ", this.state);
        
       editedProperty[propertyName] = value;
       editedProperty.MachineID = 55;

       console.log("editedProperty[propertyName]: ", editedProperty[propertyName])

      console.log("Edited[name] ," , editedProperty[propertyName])
      

      this.setState({
        productInRealEdit: this.props.dataItem
      });
  }

  render() {
   
      return (
        <Dialog
            onClose={this.props.cancel
            
            }
        >
            <form onSubmit={this.handleSubmit}>

            <div style={{ marginBottom: '1rem' }}>
                    <label>
                    Vendor<br />
                    <Input
                        type="text"
                        name="VendorID"
                        value={this.state.productInRealEdit.VendorID || ''}
                        onChange={this.onDialogInputChange}
                    />
                    </label></div>


                      <div style={{ marginBottom: '1rem' }}>
                    <label>
                    Address<br />
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
                    </label></div>


                <div style={{ marginBottom: '1rem' }}>
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
                    </label></div>

                    <div style={{ marginBottom: '1rem' }}>
                    <label>
                    Model photo<br />
                    <Input
                        type="text"
                        name="ModelPhoto"
                        value={this.state.productInRealEdit.ModelPhoto || ''}
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
                    onClick={()=> this.props.edit(this.props.dataItem.id)}>Edit</button>
            </DialogActionsBar>
        </Dialog>
    );
  }
}
