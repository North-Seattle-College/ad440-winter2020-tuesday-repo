//This component creates a fixed side navigation for the application with the
//logo component for the PotO'Gold.

//Here I imported libraries in order to create the side navigation
import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import '../css/SideNav.css';

//Class for the navigation
class SideNav extends Component {
  render() {
    const styles = {
      tabLink: {
        height: 50,
      },
      tabLabel: {
        fontSize: 28,
        color: 'white',
        textTransform: 'none',
      }
    };
    return (
      <div>

        <Paper
        className="sidenav"
        zDepth={0}
        children= {

        <div className="content-wrapper">


        <div className="relative-nav-wrapper">

        {/*This part responsible for creating buttons for the side navigation */}
        <div>
        <FlatButton
        style={styles.tabLink}
        label="Home"
        labelStyle={styles.tabLabel}
        fullWidth/>
        </div>

        <div>
        <FlatButton
        style={styles.tabLink}
        label="About"
        labelStyle={styles.tabLabel}
        fullWidth/>
        </div>

        <div>
        <FlatButton
        style={styles.tabLink}
        label="Roasters"
        labelStyle={styles.tabLabel}
        fullWidth/>
        </div>

        <div>
        <FlatButton
        style={styles.tabLink}
        label="Equipment"
        labelStyle={styles.tabLabel}
        fullWidth/>
        </div>

        <div>
        <FlatButton
        style={styles.tabLink}
        label="Snacks"
        labelStyle={styles.tabLabel}
        fullWidth/>
        </div>

        <div>
        <FlatButton
        style={styles.tabLink}
        label="Services"
        labelStyle={styles.tabLabel}
        fullWidth/>
        </div>

        <div>
        <FlatButton
        style={styles.tabLink}
        label="Quote"
        labelStyle={styles.tabLabel}
        fullWidth/>
        </div>

        </div>

        </div>
        }
        />

        </div>
    );
  }
}
export default SideNav;
