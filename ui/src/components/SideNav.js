//This component creates a fixed side navigation for the application with the
//logo component for the PotO'Gold.

//Here I imported libraries in order to create the side navigation
import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import '../css/SideNav.css';
import logo from './logo.png';

//Class for the navigation
class SideNav extends Component {
  render() {
    const styles = {
      tabLink: {
        height: 50,
      },
      tabLabel: {
        fontSize: 28,
        color: 'black',
        textTransform: 'none',
      }
    };
    return (
      <div>
      
        <Paper
        zDepth={1}
        className="sidenav"
        children= {
        
        <div className="content-wrapper">
          
        <center>
        <div className="relative-logo-wrapper">
        
        {/*This part os responsible for placing the logo on the page*/}
        <img src={logo} className="logo" alt="logo"/>
        </div>
        </center>
        
        <div className="relative-nav-wrapper">
        <center>
        
        <div>
        {/*This part is responsible for the title */}
        <span className="name">PotO'Gold</span>
        
        </div>
        </center>
              
        <br/>
        <Divider/>
        
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
        label="Get a Quote"
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