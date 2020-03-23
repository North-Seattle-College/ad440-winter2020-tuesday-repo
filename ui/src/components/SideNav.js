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

        <Link to="Roasters"><div>
        <FlatButton
        style={styles.tabLink}
        label="Roasters"
        labelStyle={styles.tabLabel}
        fullWidth/>
        </div></Link>

        <Link to="Equipment"><div>
        <FlatButton
        style={styles.tabLink}
        label="Equipment"
        labelStyle={styles.tabLabel}
        fullWidth/>
        </div></Link>

        <Link to="Snacks"><div>
        <FlatButton
        style={styles.tabLink}
        label="Snacks"
        labelStyle={styles.tabLabel}
        fullWidth/>
        </div></Link>

        <Link to="Services"><div>
        <FlatButton
        style={styles.tabLink}
        label="Services"
        labelStyle={styles.tabLabel}
        fullWidth/>
        </div></Link>

        <Link to="Quote"><div>
        <FlatButton
        style={styles.tabLink}
        label="Quote"
        labelStyle={styles.tabLabel}
        fullWidth/>
        </div></Link>

            <Switch>
          <Route exact path="/Home">
            <Home/>
          </Route>

          <Route path="/About">
            <About/>
          </Route>

          <Route path="/Roasters">
            <Roasters/>
          </Route>

          <Route path="/Equipment">
            <Equipment/>
          </Route>

          <Route path="/Snacks">
            <Snacks/>
          </Route>

          <Route path="/Services">
            <Services/>
          </Route>

          <Route path="/Quote">
            <Quote/>
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

function Roasters() {
  return (
    <div>
      <h2>Roasters</h2>
    </div>
  );
}

function Equipment() {
  return (
    <div>
      <h2>Equipment</h2>
    </div>
  );
}

function Snacks() {
  return (
    <div>
      <h2>Snacks</h2>
    </div>
  );
}

function Services() {
  return (
    <div>
      <h2>Services</h2>
    </div>
  );
}

function Quote() {
  return (
    <div>
      <h2>Quote</h2>
    </div>
  );
}
