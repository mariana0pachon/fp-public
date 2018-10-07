import React, { Component } from 'react';
import './App.css';
import MIDISounds from 'midi-sounds-react';

import SynthGrid from './components/SynthGrid';
import DrumsGrid from './components/DrumsGrid';
import BassGrid from './components/BassGrid';
import VerticalLine from './components/VerticalLine';

class App extends Component {

  constructor(){
    super();
    this.state = {
      currentGrid: '',
      drumsMatrix : [
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      ],
      synthMatrix : [
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      ],
      bassMatrix : [
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      ],
    }
    this.song=[];
    this.beats=[];
    this.melody=[];
  }

   playSynth=(i,j)=>  {
      let note;
      switch(i){
        case 0:
          note=60;
          break;
        case 1:
          note=62;
          break;
        case 2:
          note=64;
          break;
        case 3:
          note=65;
          break;
        case 4:
          note=67;
          break;
        case 5:
          note=69;
          break;
        case 6:
          note=71;
          break;
        case 7:
          note=72;
          break;
      }
      //this.midiSounds.playChordNow(3, [note], 2.5);
      var temp = this.state.synthMatrix;
      temp[i][j] = !temp[i][j];
      this.setState({synthMatrix : temp});
      this.loadSequence();
  }

 playDrums=(i,j)=>  {
    let drum;
    switch(i){
      case 0:
        drum=16;
        break;
      case 1:
        drum=17;
        break;
      case 2:
        drum=18;
        break;
      case 3:
        drum=19;
        break;
    }
    //this.midiSounds.playDrumsNow([drum]);
    var temp = this.state.drumsMatrix;
    temp[i][j] = !temp[i][j];
    this.setState({drumsMatrix : temp});
    this.loadSequence();
  }

   playBass=(i,j)=>  {
      let note;
      switch(i){
        case 0:
          note=60;
          break;
        case 1:
          note=62;
          break;
        case 2:
          note=64;
          break;
        case 3:
          note=65;
          break;
        case 4:
          note=67;
          break;
        case 5:
          note=69;
          break;
        case 6:
          note=71;
          break;
        case 7:
          note=72;
          break;
      }
     // this.midiSounds.playChordNow(130, [note], 1);
      var temp = this.state.bassMatrix;
      temp[i][j] = !temp[i][j];
      this.setState({bassMatrix : temp});
      this.loadSequence();
  }

  loadSequence() {
    for (var i=0;i<16;i++){

      //drums
      let drums=[];
      console.log('drums', drums);
      if (this.state.drumsMatrix[0][i]){
        drums.push(16);
      }
      if (this.state.drumsMatrix[1][i]){
        drums.push(17);
      }
      if (this.state.drumsMatrix[2][i]){
        drums.push(18);
      }
      if (this.state.drumsMatrix[3][i]){
        drums.push(19);
      }
      let song=[];

      //synth
     let synths=[130, [], 1/4];
      if (this.state.synthMatrix[0][i]){synths[1].push(60)}
      if (this.state.synthMatrix[1][i]){synths[1].push(62)}
      if (this.state.synthMatrix[2][i]){synths[1].push(64)}
      if (this.state.synthMatrix[3][i]){synths[1].push(65)}
      if (this.state.synthMatrix[4][i]){synths[1].push(67)}
      if (this.state.synthMatrix[5][i]){synths[1].push(69)}
      if (this.state.synthMatrix[6][i]){synths[1].push(71)}
      if (this.state.synthMatrix[7][i]){synths[1].push(72)}
      //this.melody.push(synths);

      let bajos=[20, [], 1/4];
       if (this.state.bassMatrix[0][i]){bajos[1].push(60)}
       if (this.state.bassMatrix[1][i]){bajos[1].push(62)}
       if (this.state.bassMatrix[2][i]){bajos[1].push(64)}
       if (this.state.bassMatrix[3][i]){bajos[1].push(65)}
       if (this.state.bassMatrix[4][i]){bajos[1].push(67)}
       if (this.state.bassMatrix[5][i]){bajos[1].push(69)}
       if (this.state.bassMatrix[6][i]){bajos[1].push(71)}
       if (this.state.bassMatrix[7][i]){bajos[1].push(72)}
      song.push(drums, [synths, bajos]);

      this.beats[i]=song;
    }
  }

  playLoop(){
    this.loadSequence();
    this.midiSounds.startPlayLoop(this.beats, 80, 1/16);
  }

  render() {
    return (
      <div>
        <MIDISounds ref={(ref) => (this.midiSounds = ref)} appElementName="root" instruments={[3]} />
        <button onClick={this.playLoop.bind(this)}>Loop</button>
        <p>Synth</p>
        <VerticalLine/>
        <SynthGrid synthMatrix={this.state.synthMatrix} playSynth={this.playSynth}/>
        <p>Drums</p>
        <DrumsGrid drumsMatrix={this.state.drumsMatrix} playDrums={this.playDrums}/>
        <p>Bass</p>
        <BassGrid bassMatrix={this.state.bassMatrix} playBass={this.playBass}/>
      </div>
    );
  }
}

export default App;
