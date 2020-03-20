
import React from 'react';
import { GridCell } from '@progress/kendo-react-grid';
import '../css/MachinesMain.css';


export default class CustomStatusCell extends React.Component {
    render() {
        console.log("Data Item: ", this.props.dataItem)
        
        const statusCategory = this.props.dataItem.status;
        return (

            <div style={{ borderRadius: '6px', 
            backgroundColor: statusCategory ? 
                    statusCategory === "green" ? this.props.myColorsProp[0].color : 
                    statusCategory === "yellow" ? this.props.myColorsProp[1].color : 
                    this.props.myColorsProp[2].color : null}}> {
                (statusCategory === null) ? '' : this.props.dataItem.statusDesc}

                 <td>
            </td>

            </div>
            // <div style={{ borderRadius: '6px', 
            // backgroundColor: statusCategory ? 
            //         statusCategory === "green" ? this.props.myColorsProp[0].color : 
            //         statusCategory === "yellow" ? this.props.myColorsProp[1].color : 
            //         this.props.myColorsProp[2].color : null : null }}> {
            //     (statusCategory === null) ? '' : this.props.dataItem.statusDesc}

            //      <td>
            // </td>

            // </div>
           
        );
    }
}