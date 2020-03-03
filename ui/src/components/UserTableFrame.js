import React from 'react';
// import { render } from 'react-dom';
import '../css/UserTableFrame.css';
import testData from '../data/testUser.json';
import UserTableRow from './UserTableRow';
import '../css/UserTableFrame.css';
import { MachineData } from './MachinesData';
import MachinesEditForm from './MachinesEditForm';
import MachinesButtons from './MachinesButtons';

export default class UserTableFrame extends React.Component {
  state = {
     users: testData.results,
     products: MachineData,
    productInEdit: undefined
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

  render() {
    const { users } = this.state;
    const isLoading = users === null;
    return (
        <div className = "outer-container">
        <div className="table-container">
          <div className="uk-overflow-auto">
            <table className="uk-table uk-table-hover uk-table-middle uk-table-divider">
              <thead>
                <tr>
                   <th>Machine ID</th>
                  <th>Vendor</th>
                  <th>Address</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {isLoading
                  ? <tr><td colSpan={6} className="uk-text-center"><em className="uk-text-muted">Loading...</em></td></tr>
                  : users.map((user, index) =>
                      <UserTableRow key={index} index={index + 1} user={user}/>
                    )
                }
              </tbody>
            </table>
          </div>
          </div>
          </div>
    );
  }
}
