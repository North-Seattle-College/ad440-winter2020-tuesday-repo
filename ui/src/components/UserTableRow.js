import React from 'react';
// import { render } from 'react-dom';
import { slideDown, slideUp } from './anim';
import '../css/UserTableRow.css';

export default class UserTableRow extends React.Component {
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
        <td>{user.location.street}</td>
        <td><p id = "p2" style = {{backgroundColor: user.status_color}}>&nbsp;</p></td>
      </tr>,
      this.state.expanded && (
        <tr className="expandable" key="tr-expander">
          <td className="uk-background-muted" colSpan={6}>
            <div ref="expanderBody" className="inner uk-grid">
              <div className="uk-width-1-4 uk-text-center">
                <img className="uk-preserve-width" src={user.picture.large} alt="avatar" />
              </div>
              <div className="uk-width-3-4">
                <h3>{user.vendor}</h3>
                <p>
                Machine ID: {user.machineID}<br/>
                Model: {user.model}
                </p>
                <p>
                Status: <p id = "p1" style = {{backgroundColor: user.status_color}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p><br/>
                Description: {user.status_desc}
                </p>
                <p>
                  Address:<br/>
                  <i>
                    {user.location.street}<br/>
                     {user.location.city + ', ' + user.location.state}<br/>
                     {user.location.postcode}
                  </i>
                </p>
                <p>
                  Contact: {user.name.first + ' ' + user.name.last}<br/>
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
