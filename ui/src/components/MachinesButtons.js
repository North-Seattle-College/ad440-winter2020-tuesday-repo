import React from 'react';
import { GridCell } from '@progress/kendo-react-grid';
import '../css/MachinesMain.css';


export default function MachinesButtons(edit, remove) {
    return class extends GridCell {
        render() {
            return (
                <td>
                    <button
                        className="k-primary k-button k-grid-edit-command"
                        onClick={() => { edit(this.props.dataItem);
                                       }}>Edit</button>

                                        &nbsp;

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
