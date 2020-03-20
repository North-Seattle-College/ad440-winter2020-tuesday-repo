
import React from 'react';
import { GridCell } from '@progress/kendo-react-grid';
import '../css/MachinesMain.css';


export default class CustomStatusCell extends React.Component {
    render() {
        console.log("this.props ", this.props)
        console.log("Data Item: ", this.props.dataItem)
        const statusCategory = this.props.dataItem.status;
        console.log("this.props.myProp, " , this.props.myProp)
        console.log("this.props.dataItem[this.props.dataItem.status]: ", this.props.dataItem.status)
       console.log("dataItem[this.props.field]: ", this.props.dataItem[this.props.field])
        return (
            <td style={{ color: statusCategory === "green" ? this.props.myColorsProp[0].color : statusCategory === "yellow"? this.props.myColorsProp[1].color : this.props.myColorsProp[2].color  }}> {
                (statusCategory === null) ? '' : this.props.dataItem[this.props.field]}
            </td>
        );
    }
}