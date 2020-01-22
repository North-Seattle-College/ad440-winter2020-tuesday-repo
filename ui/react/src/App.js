import React from 'react';
import './App.css';
import TextComponent from './components/TextComponent';
import ToggleSwitch from './components/toggleSwitch';
// renders main page together omponents/TextComponent';with new Text Component
function App() {
  
  return (
    <div className="App">
      <header className="App-header"> 
        <ToggleSwitch/>  
        <TextComponent/>
      </header>
    </div>
  );
}

export default App;
