
import React from 'react';
import '../css/MachinesMain.css';


export default class CustomStatusCell extends React.Component {
    render() {

        const statusCategory = this.props.dataItem.Status;
        return (
<td style = {{ textAlign: "center", left: 'auto', right: 'auto'}}>
            <div style={{ borderRadius: '6px',  height: "30px", width: "80%",
            marginLeft: '10%',
            backgroundColor: statusCategory ?
                    statusCategory.toLowerCase() === "green" ? this.props.myColorsProp[0].color :
                    statusCategory.toLowerCase() === "yellow" ? this.props.myColorsProp[1].color :
                    this.props.myColorsProp[2].color : null}}>
</div>
            </td>
        );
    }
}
