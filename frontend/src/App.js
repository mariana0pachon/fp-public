import React, { Component } from 'react';
import './App.css';
import MIDISounds from 'midi-sounds-react';
import ToggleMenu from './components/ToggleMenu';
import SynthGrid from './components/SynthGrid';
import DrumsGrid from './components/DrumsGrid';
import BassGrid from './components/BassGrid';
import VerticalLine from './components/VerticalLine';

class App extends Component {

  constructor(){
    super();
    this.state = {
      looping: false,
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
    this.bpm=120;
  }

   playSynth=(i,j)=>  {
      var temp = this.state.synthMatrix;
      temp[i][j] = !temp[i][j];
      this.setState({synthMatrix : temp});
      this.loadSequence();
  }

 playDrums=(i,j)=>  {
    var temp = this.state.drumsMatrix;
    temp[i][j] = !temp[i][j];
    this.setState({drumsMatrix : temp});
    this.loadSequence();
  }

   playBass=(i,j)=>  {
      var temp = this.state.bassMatrix;
      temp[i][j] = !temp[i][j];
      this.setState({bassMatrix : temp});
      this.loadSequence();
  }

  loadSequence() {
    for (var i=0;i<16;i++){

      //drums
      let drums=[];
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
     let synths=[130, [], 2.5];
      if (this.state.synthMatrix[0][i]){synths[1].push(72)}
      if (this.state.synthMatrix[1][i]){synths[1].push(71)}
      if (this.state.synthMatrix[2][i]){synths[1].push(69)}
      if (this.state.synthMatrix[3][i]){synths[1].push(67)}
      if (this.state.synthMatrix[4][i]){synths[1].push(65)}
      if (this.state.synthMatrix[5][i]){synths[1].push(64)}
      if (this.state.synthMatrix[6][i]){synths[1].push(62)}
      if (this.state.synthMatrix[7][i]){synths[1].push(60)}
      //this.melody.push(synths);

      let bajos=[20, [], 2.5];
       if (this.state.bassMatrix[0][i]){bajos[1].push(72)}
       if (this.state.bassMatrix[1][i]){bajos[1].push(71)}
       if (this.state.bassMatrix[2][i]){bajos[1].push(69)}
       if (this.state.bassMatrix[3][i]){bajos[1].push(67)}
       if (this.state.bassMatrix[4][i]){bajos[1].push(65)}
       if (this.state.bassMatrix[5][i]){bajos[1].push(64)}
       if (this.state.bassMatrix[6][i]){bajos[1].push(62)}
       if (this.state.bassMatrix[7][i]){bajos[1].push(60)}
      song.push(drums, [synths, bajos]);

      this.song[i]=song;
    }
  }

  playLoop(){
    this.loadSequence();
    this.midiSounds.startPlayLoop(this.song, this.bpm, 1/4);
    this.setState({looping: true});
  }

  stopLoop(){
    this.midiSounds.stopPlayLoop();
    this.setState({looping: false});
  }

  componentDidMount(){
    this.playLoop();
  }

  render() {

    return (
      <div>
        <ToggleMenu/>
        <MIDISounds ref={(ref) => (this.midiSounds = ref)} appElementName="root" instruments={[3]} />
        <button onClick={()=>this.playLoop()}>Play Loop</button>
        <button onClick={()=>this.stopLoop()}>Stop Loop</button>
        {
          this.state.looping
          ? <VerticalLine bpm={this.bpm}/>
          : null
        }
        <p>Synth</p>
        <SynthGrid synthMatrix={this.state.synthMatrix} playSynth={this.playSynth}/>
        <p>Drums</p>
        <DrumsGrid drumsMatrix={this.state.drumsMatrix} playDrums={this.playDrums}/>
        <p>Bass</p>
        <BassGrid bassMatrix={this.state.bassMatrix} playBass={this.playBass}/>
        {this.playLoop.bind(this)}
      </div>
    );
  }
}

export default App;
