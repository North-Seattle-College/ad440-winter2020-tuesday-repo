import React from 'react';
import './css/App.css';

import Wrapper from './components/Wrapper';
// renders main page together omponents/TextComponent';with new Text Component
function App() {
  
  return (
    <div className="App">
      <header className="App-header"> 
        <Wrapper/>
      </header>    
    </div>
  );
}

export default App;
