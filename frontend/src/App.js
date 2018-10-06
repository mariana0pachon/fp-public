import React, { Component } from 'react';
import './App.css';
import SynthGrid from './components/SynthGrid';
import VerticalLine from './components/VerticalLine';

class App extends Component {

  constructor(){
    super();
    this.state = {

    }
  }

  render() {
    return (
      <div>
		<VerticalLine/>
        <SynthGrid />
		<VerticalLine/>
      </div>
    );
  }
}

export default App;
