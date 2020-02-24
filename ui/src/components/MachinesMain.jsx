
import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
import { MachineData } from './MachinesData';
import MachinesEditForm from './MachinesEditForm';
import MachinesButtons from './MachinesButtons';

export default class MachinesMain extends React.Component {
    state = {
        products: MachineData.slice(0, 12),
        productInEdit: undefined
    };

    edit = (dataItem) => {
        this.setState({ productInEdit: this.cloneProduct(dataItem) });
    }

    remove = (dataItem) => {
        this.setState({
            products: this.state.products.filter(p => p.id !== dataItem.id)
        });
    }

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

    cancel = () => {
        this.setState({ productInEdit: undefined });
    }

    insert = () => {
        this.setState({ productInEdit: { } });
    }

    render() {
        return (
            <div >
                <Grid
                    data={this.state.products}
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
                    <Column field="id" title="ID" width="50px" />
                    <Column field="vendor" title="Vendor" />
                    <Column field="address" title="Address" />
                    <Column field="status" title="Status" />
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

//ReactDOM.render(
//    <App />,
//    document.querySelector('my-app')
//);

