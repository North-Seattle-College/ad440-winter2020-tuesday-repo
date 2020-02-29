import React from 'react';
import { GridCell } from '@progress/kendo-react-grid';
import '../css/MachinesMain.css';

//Created by Siergiey
//This component is responsible for generating EDIT and REMOVE buttons
export default function MachinesButtons(edit, remove) {
    return class extends GridCell {
        render() {
            return (
                <td>
                {/*This is EDIT button*/}
                <button
                        className="k-primary k-button k-grid-edit-command"
                        onClick={() => { edit(this.props.dataItem);
                                       }}>Edit</button>

                                        &nbsp;
                {/*This is REMOVE button*/}
                <button
                        className="k-button k-grid-remove-command"
                        onClick={() => {
                            window.confirm('Confirm deleting: ' + this.props.dataItem.vendor) &&
                                remove(this.props.dataItem);
                                }}>Remove</button>
                </td>
            );
        }
    };
}
