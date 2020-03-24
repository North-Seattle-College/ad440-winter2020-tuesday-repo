
import React from 'react';
// import ReactDOM from 'react-dom';
import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
import { MachineData } from './MachinesData';
import MachinesEditForm from './MachinesEditForm';
import MachinesDetailsForm from './MachinesDetailsForm';
import MachinesButtons from './MachinesButtons';
import '../css/MachinesMain.css';
import ApiUrl from "./ApiUrl";
//import GlobalFilter from "./GlobalFilter"
import MachinesSaveNewForm from "./MachinesSaveNewForm"
import CustomStatusCell from "./CustomStatusCell"

//This is the main component that is responsible for importing all the components
//to generate the machines table

function refreshPage() {
    window.location.reload(true);
}

export default class MachinesMain extends React.Component {
    state = {
        products: MachineData.slice(0, 12),
        productInEdit: undefined,
        productInRealEdit: undefined,
        machines: [],
        isError: false,
        editedProductID: undefined
    };

    customData = [
        { color: 'green' },
        { color: 'yellow' },
        { color: 'red' }
    ];

    MyCustomCell = (props) => <CustomStatusCell {...props} myColorsProp = {this.customData}
    />




    /* Author Iryna
    * Builds machine array with only necessary details about each machine for the table rows
    */
    buildMachinesForTable = (machines) => {
        const cleanData = [];
        for (var i = 0; i< machines.length; i++){
            cleanData.push({

                  MachineID: machines[i].MachineID,
                  VendorID: machines[i].VendorID,
                  Vendor: machines[i].Vendor,
                  LocationID: machines[i].LocationID,
                  street: machines[i].StreetAddress,
                  city: machines[i].City,
                  state: machines[i].State,
                  zip: machines[i].ZipCode,
                  phone: machines[i].PhoneNum,
                  Model: machines[i].Model,
                  ModelNum: machines[i].ModelNum,
                  SerialNum: machines[i].SerialNum,
                  // LocationID: machines[i].LocationID,
                  LocationName: machines[i].LocationName,
                  ModelPhoto: machines[i].ModelPhoto,
                  Status : machines[i].Status,
                  StatusDescription: machines[i].StatusDescription

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

    //this.refreshTimer();
}

/******************** DELETE API  **********************/
deletemachine(id) {

    console.log("Delete id is ", id);
    if(window.confirm('DELETE Machine ID #' + id + '?'))
    {
      fetch('https://maria-fun-usw2-task141.azurewebsites.net/api/v1/machines/'+id,{
        method:'DELETE',
        header:{'Accept':'application/json',
        'Content-Type': 'application/json'

      }
      }).then((response) => response.text())
      .then((data) => {
        console.log('Success:', data);
      }).then(refreshPage)
      .catch((error) => {
        console.error('Error:', error);
      })
    }
  }

/**
 * Edit machine method
 * Author - Iryna Sherepot
 * After the request was processed, it changes the item in edit state to undefined and
 * the dialog window disapears
 */
    edit = (editedProductID) => {
        console.log("Edit started")
        console.log("EditedProduceID : ", editedProductID)
        console.log("State ", this.state)
        const machine = this.state.productInRealEdit;
        machine.MachineID = this.state.editedProductID;
        console.log("machine.MachineID: ", machine.MachineID)
        console.log("Machine in the Edit method ", machine);

       // console.log("Machine is: ", machine)
       // console.log("Json stringify ", JSON.stringify(machine))
        console.log("JSON.stringify(this.state.productInRealEdit): ", JSON.stringify(this.state.productInRealEdit))
        const wholeProductInfo = this.state.productInRealEdit;


        //-----THIS IS TEMPORARY DATA STRUCTURE TO MATCH THE PUT API BODY */
        const tempEditProduct = {};

        // TODO - make copying efficioent
        tempEditProduct.MachineID = wholeProductInfo.MachineID;
        tempEditProduct.VendorID = wholeProductInfo.VendorID;
        tempEditProduct.LocationID = wholeProductInfo.LocationID;
        tempEditProduct.Model = wholeProductInfo.Model;
        tempEditProduct.ModelNum = wholeProductInfo.ModelNum;
        tempEditProduct.SerialNum = wholeProductInfo.SerialNum;
        tempEditProduct.ModelPhoto = wholeProductInfo.ModelPhoto;
        tempEditProduct.Status = wholeProductInfo.Status;
        tempEditProduct.StatusDescription = wholeProductInfo.StatusDescription;


        console.log(" tempEditProduct ", tempEditProduct)




         if(!machine.ModelPhoto){
            machine.ModelPhoto = " "
        }
            fetch('https://jos-rg-fun-usw2-task62.azurewebsites.net/api/v1/machines'
            , {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify(tempEditProduct),

            }).then((response) => response.text())
            .then((data) => {
              console.log('Success:', data);
            }).then(refreshPage)
            .catch((error) => {
              console.error('Error:', error);
            });

       this.setState({
        productInRealEdit: undefined
    });

        console.log("This state product in real edit: ", this.state.productInRealEdit);
    //}
    }

    /**
     * Shows details of selected machine
     */
    details = (dataItem) => {

    this.setState({ productInDetails: this.cloneProduct(dataItem) });
    }


  /**
   * Sends POST request to the database after the user clicks SAve button
   */
    save = () => {
        console.log("Save started")
        const dataItem = this.state.productInEdit;
        console.log("This state productInEdit is: ", this.state.productInEdit)
        console.log("productInEdit ", this.state.productInEdit);
        const products = this.state.products.slice();
        const isNewProduct = dataItem.id === undefined;
        console.log("Data item ", JSON.stringify(dataItem));
        console.log("isNewProduct ", isNewProduct);


        if (isNewProduct) {
            // do POST here
            // no need to have macchine ID entered, as it should be auto-incremented
            console.log ("Machines Main productInEdit: ", this.state.productInEdit)
            if(!dataItem.ModelPhoto){
                dataItem.ModelPhoto = ""
           }

           console.log("Json stringify ", JSON.stringify(dataItem))
            fetch('https://ken-fun-feat-usw2-task60.azurewebsites.net/api/v1/machines'
            , {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify(dataItem),
            }).then((response) => response.text())
            .then((data) => {
              console.log('Success:', data);
            }).then(refreshPage)
            .catch((error) => {
              console.error('Error:', error);
            });

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


    cancel = () => {
        // checking which of edit or details window  is open
        if(this.state.productInEdit){
            this.setState({ productInEdit: undefined });
        }else if(this.state.productInRealEdit && !this.state.productInEdit){
            this.setState({productInRealEdit: undefined});

        } else if(this.state.productInDetails) {
            this.setState({ productInDetails: undefined })
        }

    }


    insert = () => {
        this.setState({ productInEdit: { } });
    }

// old edit method that displayed current product details in edit screen
/*state of the edited machine*/
// edit = (dataItem) => {
//     this.setState({ productInEdit: this.cloneProduct(dataItem) });
// }


 /**
 * Opens the edit dialog by setting the product in edit to empty
 * It takes the id as a parameter
 */
    openEditForm = (id, dataItem) => {


        console.log("Open Edit Form id : ", id);
        console.log("Data Item Open edit form ", dataItem )

        this.setState(
            {
              productInRealEdit: this.cloneProduct(dataItem),
              editedProductID : id}
              );
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
        // console.log("machinesCleanData in render: " , machinesCleanData)

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

                            </div>
                        </div>
    </GridToolbar>
                    <Column field="MachineID" title="ID" width="75px" />
                    <Column field="VendorID" title="Vendor" width="150px"/>
                    <Column field="LocationID" title="Location ID"  width="150px"/>
                    <Column field="LocationName" title="Location Name"  width="150px"/>
                    <Column field="Model" title="Model"

                    // cell = {<button
                    //     onClick={this.insert}
                    //     className="k-button">Edit</button>}
                       width="120px"/>
                    <Column field="Status" title="Status"
                       // field = "status"
                        cell = {this.MyCustomCell}
                                 width="150px"/>

                    <Column title="Edit Remove Details"
                        cell={MachinesButtons(this.openEditForm, this.deletemachine, this.details)}

                    />
                </Grid>
                {/* Pass the form type here throught a boolean or string */}
                {this.state.productInRealEdit && <MachinesEditForm    dataItem={this.state.productInRealEdit} edit ={this.edit} cancel={this.cancel}/>}
                {this.state.productInEdit     && <MachinesSaveNewForm dataItem={this.state.productInEdit}     save={this.save}  cancel={this.cancel}/>}
                {this.state.productInDetails  && <MachinesDetailsForm dataItem={this.state.productInDetails}  save={this.save}  cancel={this.cancel}/>}
            </div>
        );
    }

    dialogTitle() {
        return `${this.state.productInEdit.MachineID === undefined ? 'Add' : 'Edit'} product`;
    }
    cloneProduct(product) {
        return Object.assign({}, product);
    }


    // refreshTimer(){
    //     if(this.state.productInRealEdit || this.state.productInEdit || this.state.productInDetails){
    //         console.log("this.state.productInRealEdit ", this.state.productInRealEdit)
    //         console.log("this.state.productInEdit ", this.state.productInEdit)
    //         console.log("this.state.productInDetails", this.state.productInDetails)
    //         setTimeout(() => {
    //                 window.location.reload(true);
    //             }, 20000);
    //         }
    // }





}
