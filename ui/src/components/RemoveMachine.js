
import React from 'react';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { Input, NumericTextBox } from '@progress/kendo-react-inputs';
import ApiUrl from "./ApiUrl";
import MachinesMain from './MachinesMain';

export default class RemoveMachine extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          productInEdit: this.props.dataItem || null
      };
  }
   deletemachine(id) {
     if(window.confirm('are you sure ?'))
     {
       fetch('https://maria-fun-usw2-task141.azurewebsites.net/api/deleteRequest?MachineID='+id,{
         method:'DELETE',
         header:{'Accept':'application/json',
         'Content-Type': 'application/json'

       }
       })
     }
   }

  render() {
      return (
        <button
                            className="mr-2"
                            onClick={()=> this.deleteDep(item.Model)}>DELETE</button>
    );
  }
}
