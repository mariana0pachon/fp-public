import React, { Component } from 'react';
import './App.css';
import SynthGrid from './components/SynthGrid';

class App extends Component {

  constructor(){
    super();
    this.state = {

    }
  }

  render() {
    return (
      <div>
        <SynthGrid />
      </div>
    );
  }
}

export default App;
