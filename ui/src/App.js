import React from 'react';
import './css/App.css';
import Login from './components/login';
import Wrapper from './components/Wrapper';
// renders main page together omponents/TextComponent';with new Text Component
function App() {

  return (
    <div className="App">
    <div className="login">
< Login />
    </div>
      <header className="App-header">     
      </header>
      <Wrapper/>

    </div>
  );
}

export default App;
