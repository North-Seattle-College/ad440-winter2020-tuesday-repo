
import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
import { MachineData } from './MachinesData';
import MachinesEditForm from './MachinesEditForm';
import MachinesDetailsForm from './MachinesDetailsForm';
import MachinesButtons from './MachinesButtons';
import '../css/MachinesMain.css';
import ApiUrl from "./ApiUrl";
import GlobalFilter from "./GlobalFilter"
import MachinesSaveNewForm from "./MachinesSaveNewForm"

//This is the main component that is responsible for importing all the components
//to generate the machines table


export default class MachinesMain extends React.Component {
    state = {
        products: MachineData.slice(0, 12),
        productInEdit: undefined,
        machines: [],
        isError: false,
    };

    /* Author Iryna
    * Builds machine array with only necessary details about each machine for the table rows
    */
    buildMachinesForTable = (machines) => {
        const cleanData = [];
        for (var i = 0; i< machines.length; i++){
            cleanData.push({
              id: machines[i].MachineID,
                  vendor: machines[i].VendorID,
                  address: machines[i].LocationID,
                  model: machines[i].Model,
                  modelnum : machines[i].ModelNum,
                  serialnum : machines[i].SerialNum,
                  locationID : machines[i].LocationID,
                  images : machines[i].ModelPhoto,
                  status: "not reported"
            })
        }

        return cleanData;
    }



   /**
    * Author - Iryna
    * Fetches the database request data after the react component has mounted.
    * Sets the state
    * Handles seveal errors
    *
    */
   async componentDidMount() {
    // Simple GET request using fetch

    // wrapping in the try/catch block to handle network errors
    try {
        // fetching async promise
        const response = await fetch(ApiUrl
    , {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'mode': 'cors',
          }});

         // error handling of responce with 500 status
         // which will not return json
        try {

            console.log("Responce falty possibly ", response)
            // resolving promise into json format
            const responseJson = await response.json()
            this.setState({machines: responseJson})
            console.log("Responce ", responseJson);

            // error handling - bad responce receved, for example text string instead of json
        }catch (error) {
            this.setState({isError: true})
        }

     //error handling - catching the network error
    } catch (error) {
        // hadling network error
        this.setState({isError: true})
        if (error.message === 'Timeout'
          || error.message === 'Network request failed') {
          // retry
        } else {
          throw error; // rethrow other unexpected errors
        }
    }
}
/*state of the edited machine*/

    edit = (dataItem) => {
        this.setState({ productInEdit: this.cloneProduct(dataItem) });
    }
    details = (dataItem) => {
    this.setState({ productInDetails: this.cloneProduct(dataItem) });
    }

    remove = (dataItem) => {
        this.setState({
            products: this.state.products.filter(p => p.id !== dataItem.id)
        });
    }
  /**
   * Sends POST request to the database
   */
    save = () => {
        console.log("Save started")
        const dataItem = this.state.productInEdit;
        console.log("This state productInEdit is: ", this.state.productInEdit)
        console.log("productInEdit ", this.state.productInEdit);
        const products = this.state.products.slice();
        const isNewProduct = dataItem.id === undefined;
        console.log("Data item id ", dataItem.id);
        console.log("isNewProduct ", isNewProduct);


        if (isNewProduct) {
            // do POST here
            // no need to have macchine ID entered, as it should be auto-incremented
           // fetch()
            //products.unshift(this.newProduct(dataItem));
            console.log("Data item id ", dataItem);
        } else {
            const index = products.findIndex(p => p.id === dataItem.id);
            products.splice(index, 1, dataItem);
        }

        this.setState({
            products: products,
            productInEdit: undefined
        });
    }

    /**
   * Sends POST request to the database
   */
  saveNewItem = () => {
    console.log("Save started")
    const dataItem = this.state.productInEdit;
    console.log("This state productInEdit is: ", this.state.productInEdit)
    console.log("productInEdit ", this.state.productInEdit);
    const products = this.state.products.slice();
    const isNewProduct = dataItem.id === undefined;
    console.log("Data item id ", dataItem.id);



    if (isNewProduct) {
        // do POST here
       // fetch()
        products.unshift(this.newProduct(dataItem));
    } else {
        const index = products.findIndex(p => p.id === dataItem.id);
        products.splice(index, 1, dataItem);
    }

    this.setState({
        products: products,
        productInEdit: undefined
    });
}

    cancel = () => {
        this.setState({ productInEdit: undefined });
    }

    // cancel = () => {
    //     this.setState({ productInDetails: undefined });
    // }

    insert = () => {
        this.setState({ productInEdit: { } });
    }

    render() {
        if (this.state.isError) {
            return (
              <div>
                <h2 style = {{color: "grey", margin: "50px"}}>Sorry, something went wrong</h2>
                </div>
            )
        }
        console.log("Is the state in error: " , this.state.isError)
        const machinesData = this.state.machines
        const  machinesCleanData =  this.buildMachinesForTable(machinesData)
       // console.log("Render state dataX " , machinesData);
       // console.log("Render state dataY " , machinesCleanData);

         return (
            <div >
                <Grid
                    data = {machinesCleanData}
                    style={{ height: '620px' }}
                >
                    {/* Add New Machine button */}
                    <GridToolbar>
                        <div class = "tableHeader">
                            <div class = "tableTitle">
                                <h1 class = "editHeader">Machine List</h1>
                            </div>

                            <div class = "addNewButton">
                                <button
                                    onClick={this.insert}
                                    className="k-button">Add New</button>
                            </div>

                            <div class = "searchField">
                                <GlobalFilter/>
                            </div>
                        </div>
    </GridToolbar>
                    <Column field="id" title="ID" width="75px" />
                    <Column field="vendor" title="Vendor" />
                    <Column field="address" title="Address" />
                    <Column field="model" title="Model"/>
                    <Column field="status" title="Status" />
                    <Column title="Edit Remove Details"
                        cell={MachinesButtons(this.edit, this.remove, this.details)}
                    />
                </Grid>
                {/* Pass the form type here throught a boolean or string */}
                {this.state.productInEdit && <MachinesEditForm dataItem={this.state.productInEdit} save={this.save} cancel={this.cancel}/>}
                {this.state.productInEdit && <MachinesSaveNewForm dataItem={this.state.productInEdit} save={this.save} cancel={this.cancel}/>}
                {this.state.productInDetails && <MachinesDetailsForm dataItem={this.state.productInDetails} save={this.save} cancel={this.cancel}/>}
            </div>
        );
    }

    dialogTitle() {
        return `${this.state.productInEdit.id === undefined ? 'Add' : 'Edit'} product`;
    }
    cloneProduct(product) {
        return Object.assign({}, product);
    }

    // newProduct(source) {
    //     const id = this.state.products.reduce((acc, current) => Math.max(acc, current.id || 0), 0) + 1;
    //     const newProduct = {
    //         id: id,
    //         vendor: '',
    //         address: '',
    //         status: ''
    //     };

    //     return Object.assign(newProduct, source);
    // }
}
