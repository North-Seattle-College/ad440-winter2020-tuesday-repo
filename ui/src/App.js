import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SideNav from './components/SideNav';
import Login from './components/Login';
import ErrorBoundary from './components/ErrorHandling/ErrorBoundary';
// import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MachinesMain from './components/MachinesMain';
import './css/App.css';

/**
 * The root App component
 *
 * It contains table with failing machines and a wrapper around it.
 */
export default  class App extends React.Component {

    render(){
      return (
        <div className="App">
        <div className="top-bar">
        </div>
            <div className="login">
<ErrorBoundary>< Login /></ErrorBoundary>
            </div>
            <MuiThemeProvider>

        {/*  <Route path="/500" component={InternalServer} /> */}

<ErrorBoundary><SideNav/></ErrorBoundary>
          <ErrorBoundary><MachinesMain/></ErrorBoundary>


            </MuiThemeProvider>
            <div className="bottom-bar">
            </div>
        </div>
      );
    }
}

setTimeout(() => {
    window.location.reload(true);}, 60000);
