
import React from 'react';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { Input, NumericTextBox } from '@progress/kendo-react-inputs';

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

