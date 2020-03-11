import React from 'react';
// import { render } from 'react-dom';
import '../css/UserTableFrame.css';
import testData from '../data/testUser.json';
import UserTableRow from './UserTableRow';
import '../css/UserTableFrame.css';


export default class UserTableFrame extends React.Component {
  state = { users: testData.results }

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
