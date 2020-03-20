
import React from 'react';
import { GridCell } from '@progress/kendo-react-grid';
import '../css/MachinesMain.css';


export default class CustomStatusCell extends React.Component {
    render() {
        console.log("this.props ", this.props)
        console.log("Data Item: ", this.props.dataItem)
        const value = this.props.dataItem[this.props.field];
        //console.log("this.props.myProp, " , this.props.myProp)
       console.log("dataItem[this.props.field]: ", this.props.dataItem[this.props.field])
        return (
            <td style={{ color: value ? this.props.myProp[0].color : this.props.myProp[1].color }}> {
                (value === null) ? '' : this.props.dataItem[this.props.field].toString()}
            </td>
        );
    }
}