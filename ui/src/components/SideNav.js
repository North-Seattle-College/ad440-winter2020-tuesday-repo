//This component creates a fixed side navigation for the application with the
//logo component for the PotO'Gold.

//Here I imported libraries in order to create the side navigation
import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import '../css/SideNav.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

//Class for the navigation
class SideNav extends Component {
  render() {
    const styles = {
      tabLink: {
        height: 60,
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
        <Router>
        <Link to="/Home"><div>
        <FlatButton
        style={styles.tabLink}
        label="Home"
        labelStyle={styles.tabLabel}
        fullWidth/>
        </div></Link>

        <Link to="About"><div>
        <FlatButton
        style={styles.tabLink}
        label="About"
        labelStyle={styles.tabLabel}
        fullWidth/>
        </div></Link>

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

            <Switch>
          <Route exact path="/Home">
        <Home/>

          </Route>
          <Route path="/About">
        <About/>

          </Route>

        </Switch>

    </Router>



        </div>

        </div>
        }
        />

        </div>
    );
  }
}
export default SideNav;

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}
