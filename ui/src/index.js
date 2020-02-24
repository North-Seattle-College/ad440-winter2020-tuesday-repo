import React from 'react';
import { render } from 'react-dom';
import { slideDown, slideUp } from './anim';
import './style.css';
import testData from './data/testUser.json';
import PageTabs from './components/PageTabs';
import Login from './components/login';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SideNav from './components/SideNav';
import GlobalFilter from './components/GlobalFilter';

// function formatDate(str) {
//   return str.substr(0, 10);
// }

function capitalize(str) {
  return str.split(' ').map(s => {
    return s.charAt(0).toUpperCase() + s.substr(1);
  }).join(' ');
}

class UserTableRow extends React.Component {
  state = { expanded: false }

  toggleExpander = (e) => {

    if (!this.state.expanded) {
      this.setState(
        { expanded: true },
        () => {
          if (this.refs.expanderBody) {
            slideDown(this.refs.expanderBody);
          }
        }
      );
    } else {
      slideUp(this.refs.expanderBody, {
        onComplete: () => { this.setState({ expanded: false }); }
      });
    }
  }

  render() {
    const { user } = this.props;
    return [
      <tr key="main" onClick={this.toggleExpander}>
      <td>{user.machineID}</td>
        <td>{user.vendor}</td>
        <td>{capitalize(user.location.street)}</td>
        <td><p style = {{backgroundColor: user.status_color}}>&nbsp;</p></td>
      </tr>,
      this.state.expanded && (
        <tr className="expandable" key="tr-expander">
          <td className="uk-background-muted" colSpan={6}>
            <div ref="expanderBody" className="inner uk-grid">
              <div className="uk-width-1-4 uk-text-center">
                <img className="uk-preserve-width" src={user.picture.large} alt="avatar" />
              </div>
              <div className="uk-width-3-4">
                <h3>{capitalize(user.vendor)}</h3>
                <p>
                Machine ID: {user.machineID}<br/>
                Model: {user.model}
                </p>
                <p>
                Status: <p id = "p1" style = {{backgroundColor: user.status_color}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p><br/>
                Description: {capitalize(user.status_desc)}
                </p>
                <p>
                  Address:<br/>
                  <i>
                    {capitalize(user.location.street)}<br/>
                     {capitalize(user.location.city + ', ' + user.location.state)}<br/>
                     {user.location.postcode}
                  </i>
                </p>
                <p>
                  Contact: {capitalize(user.name.first + ' ' + user.name.last)}<br/>
                  E-mail: {user.email}<br/>
                  Phone: {user.phone}
                </p>
              </div>
            </div>
          </td>
        </tr>
      )
    ];
  }
}


class App extends React.Component {
  state = { users: testData.results }

  render() {
    const { users } = this.state;
    const isLoading = users === null;
    return (
      <main>
      <div className="App">
      <div className="login">
      < Login />
      </div>
        <MuiThemeProvider>
      <SideNav/>
      <PageTabs/>
    </MuiThemeProvider>
      <div className = "test-container">
      <h2>Machines List</h2>
      <GlobalFilter/>
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
        </div>
      </main>

    );
  }
}

render(<App />, document.getElementById('root'));
