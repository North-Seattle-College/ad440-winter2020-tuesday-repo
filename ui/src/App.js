import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SideNav from './components/SideNav';
import PageTabs from './components/PageTabs';
import Login from './components/Login';
import ErrorBoundary from './components/ErrorHandling/ErrorBoundary';
import InternalServer from './components/ErrorHandling/InternalServer';
import { BrowserRouter, Switch, Route } from 'react-router-dom';





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
<ErrorBoundary><PageTabs/></ErrorBoundary>

            </MuiThemeProvider>
        </div>
      );
    }
}
