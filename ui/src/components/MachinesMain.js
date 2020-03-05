//Created by Siergiey \
import React from 'react';
import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
import { MachineData } from './MachinesData';
import MachinesEditForm from './MachinesEditForm';
import MachinesButtons from './MachinesButtons';
import '../css/MachinesMain.css';

//This is the main component that is responsible for importing all the components
//to generate the machines table


// array to hold machines extracted from fetching
let machineData = [];
const cleanData = [];

export default class MachinesMain extends React.Component {
    state = {
        products: MachineData.slice(0, 12),
        productInEdit: undefined,
        items: []
    };


    buildMachinesForTable = (items) => {
        // MachineID: 1
        // VendorID: 0
        // LocationID: 1010
        // Model: "Joses Model", 
        // status: undefined
        for (var i = 0; i< items.length; i++){

            cleanData.push({
                id: items[i].MachineID,
                vendor: items[i].VendorID,
                adress: items[i].LocationID,
                model: items[i].Model,
                status: "not reported"
            })
        }

        return cleanData;
    }

  

 
    componentDidMount() {
        // Simple GET request using fetch
        fetch('https://kiara-fun-feat-usw2-task155.azurewebsites.net/api/getMachine?code=14B1U2/gQPU6sRlIfwDt2iaVsaSCfTuccDvM1YgEDAbQrDzLQjWQyQ=='
        , {method: "GET"})
        .then((response) => response.json())
        .then((responseText) => {
            this.setState({items: responseText})
            console.log("State items ", this.state.items);
            console.log(responseText);
        }
        )
        .then(
            this.setState({items: machineData}),
            machineData.forEach(machine => {
                console.log("machine ", machine.VendorID)
                cleanData.push({
                    id: machine.MachineID,
                })
             }))
            
        . then(
                console.log("State items are ", this.state.items)
        )
            
        .catch((error) => {
            console.log("reset client error-------",error);
       });

       
    }

/*state of the edited machine*/

    edit = (dataItem) => {
        this.setState({ productInEdit: this.cloneProduct(dataItem) });
    }
/*state of the removed machines*/
    remove = (dataItem) => {
        this.setState({
            products: this.state.products.filter(p => p.id !== dataItem.id)
        });
    }
/*state of the saved machine*/
    save = () => {
        const dataItem = this.state.productInEdit;
        const products = this.state.products.slice();
        const isNewProduct = dataItem.id === undefined;

        if (isNewProduct) {
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
/*what happens when we cancel the action*/
    cancel = () => {
        this.setState({ productInEdit: undefined });
    }

    insert = () => {
        this.setState({ productInEdit: { } });
    }
/*this part renders the table*/
    render() {
        const dataX = this.state.items
        const dataY =  this.buildMachinesForTable(dataX)
        console.log("Render state dataX " , dataX);
        console.log("Render state dataY " , dataY);
        // const it = this.state.items;
        // const newArray = this.buildMachinesForTable(it);
        // console.log("New Array ", newArray);
         return (
            <div >
                <Grid
                    // data={this.buildMachinesForTable(this.state.items)}
                    data = {dataY}
                    style={{ height: '420px' }}
                >
                    <GridToolbar>
                        <button
                            onClick={this.insert}
                            className="k-button"
                        >
                            Add New
                        </button>
                    </GridToolbar>
                    {/*names for the columns*/}
                    <Column field="id" title="ID" width="50px" />
                    <Column field="vendor" title="Vendor" />
                    <Column field="address" title="Address" />
                    <Column field="model" title="Model"/>
                    <Column field="status" title="Status" />
                    <Column field="blah" title="bblah" />
                    <Column field="blah" title="bladfdsafh" />
                    <Column field="blah" title="bblafdsarhtrhh" />
                    <Column
                        title="Edit"
                        cell={MachinesButtons(this.edit, this.remove)}
                    />
                </Grid>
                {this.state.productInEdit && <MachinesEditForm dataItem={this.state.productInEdit} save={this.save} cancel={this.cancel}/>}
            </div>
        );
    }

    dialogTitle() {
        return `${this.state.productInEdit.id === undefined ? 'Add' : 'Edit'} product`;
    }
    cloneProduct(product) {
        return Object.assign({}, product);
    }

    newProduct(source) {
        const id = this.state.products.reduce((acc, current) => Math.max(acc, current.id || 0), 0) + 1;
        const newProduct = {
            id: id,
            vendor: '',
            address: '',
            status: ''
        };

        return Object.assign(newProduct, source);
    }
}
