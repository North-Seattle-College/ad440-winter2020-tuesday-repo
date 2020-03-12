//Created by Siergiey
//Error boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed. 

import React, { Component } from 'react';
import ErrorReportingTool from './ErrorReportingTool';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      info: '',
      error: '',
    };
  }

  componentDidCatch(error, info) {
      // log the error to an error reporting service
    this.setState({ hasError: true, info, error });
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      console.log(`Error: ${error}`);
      console.log(`ErrorInfo: ${JSON.stringify(info)}`);
    }
    else {
      ErrorReportingTool.report(error, info);
    }
  }

  render() {
    return this.state.hasError ? 
// You can render any custom fallback UI
<p>Something went wrong :( </p> : this.props.children;
  }
}

export default ErrorBoundary;