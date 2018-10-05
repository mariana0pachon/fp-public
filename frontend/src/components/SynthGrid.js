import React, { Component } from 'react';
import MIDISounds from 'midi-sounds-react';

class SynthGrid extends Component {

  constructor(){
    super();
    this.state = {

    }
  }

  playC() {
    this.midiSounds.playChordNow(3, [60], 2.5);
  }

   playD() {
    this.midiSounds.playChordNow(3, [62], 2.5);
  }

  render() {
    return (
      <div>
        <MIDISounds ref={(ref) => (this.midiSounds = ref)} appElementName="root" instruments={[3]} />
        
        <div className='instrument-row'>
          <div className='block' onClick={this.playC.bind(this)}></div>
          <div className='block' onClick={this.playC.bind(this)}></div>
          <div className='block' onClick={this.playC.bind(this)}></div>
          <div className='block' onClick={this.playC.bind(this)}></div>
          <div className='block' onClick={this.playC.bind(this)}></div>
          <div className='block' onClick={this.playC.bind(this)}></div>
          <div className='block' onClick={this.playC.bind(this)}></div>
          <div className='block' onClick={this.playC.bind(this)}></div>
          <div className='block' onClick={this.playC.bind(this)}></div>
          <div className='block' onClick={this.playC.bind(this)}></div>
          <div className='block' onClick={this.playC.bind(this)}></div>
          <div className='block' onClick={this.playC.bind(this)}></div>
          <div className='block' onClick={this.playC.bind(this)}></div>
          <div className='block' onClick={this.playC.bind(this)}></div>
          <div className='block' onClick={this.playC.bind(this)}></div>
          <div className='block' onClick={this.playC.bind(this)}></div>
        </div>
        <div className='instrument-row'>
          <div className='block' onClick={this.playD.bind(this)}></div>
          <div className='block' onClick={this.playD.bind(this)}></div>
          <div className='block' onClick={this.playD.bind(this)}></div>
          <div className='block' onClick={this.playD.bind(this)}></div>
          <div className='block' onClick={this.playD.bind(this)}></div>
          <div className='block' onClick={this.playD.bind(this)}></div>
          <div className='block' onClick={this.playD.bind(this)}></div>
          <div className='block' onClick={this.playD.bind(this)}></div>
          <div className='block' onClick={this.playD.bind(this)}></div>
          <div className='block' onClick={this.playD.bind(this)}></div>
          <div className='block' onClick={this.playD.bind(this)}></div>
          <div className='block' onClick={this.playD.bind(this)}></div>
          <div className='block' onClick={this.playD.bind(this)}></div>
          <div className='block' onClick={this.playD.bind(this)}></div>
          <div className='block' onClick={this.playD.bind(this)}></div>
          <div className='block' onClick={this.playD.bind(this)}></div>
        </div>
      
      </div>
    );
  }
}

export default SynthGrid;
