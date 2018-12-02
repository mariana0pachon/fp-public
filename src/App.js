import React, { Component } from 'react';
import './App.css';
import MIDISounds from 'midi-sounds-react';
import ToggleMenu from './components/ToggleMenu';
import SynthGrid from './components/SynthGrid';
import DrumsGrid from './components/DrumsGrid';
import BassGrid from './components/BassGrid';
import VerticalLine from './components/VerticalLine';
import Visualize1 from './components/Visualize1';
import Visualize2 from './components/Visualize2';
import Visualize3 from './components/Visualize3';
import Visualize4 from './components/Visualize4';


class App extends Component {

  constructor(){
    super();
    this.state = {
      visInstructions: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      looping: false,
      currentGrid: 'synth',
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
    this.bpm=128;
  }

  // takes in i=y=row and j=x=column of a clicked synth cell
  // changes the state of the synth matrix when a cell is clicked
  playSynth=(i,j)=>  {
    var temp = this.state.synthMatrix;

    // sets cell to what it wasn't before being clicked
    temp[i][j] = !temp[i][j];
      
    //sets state of synthMatrix with new configuration
    this.setState({synthMatrix : temp});

    // reload the sequence
    this.loadSequence();
  }

  // takes in i=y=row and j=x=column of a clicked drum cell
  // changes the state of the drum matrix when a cell is clicked
  // changes the state of the visInstructions for each quarter note
  playDrums=(i,j)=>  {

    // saves the visualization command 
    let visCmd = 0;
    var temp = this.state.drumsMatrix;
    temp[i][j] = !temp[i][j];

    // checks all rows in column j
    // determines visualization instructions for combination of sounds in col j
    for (let y=0; y<4; y++){

      if(this.state.drumsMatrix[y][j]){
        // shifts 1 y bits to the left (giving 2, 4, 8 or 16)
        // bitwise ORs current visCmd with 2, 4, 8 or 16
        visCmd |= 1 << y;
      }
    }

    // value to be set to the specific instruction of a column
    var visTemp = this.state.visInstructions;
    visTemp[j] = visCmd;

    this.setState({
      // set state of the drum matrix
      drumsMatrix : temp,
      visInstructions: visTemp,
    });
    this.loadSequence();
  }

  // takes in i=y=row and j=x=column of a clicked drum cell
  // changes the state of the drum matrix when a cell is clicked
  playBass=(i,j)=>  {
    var temp = this.state.bassMatrix;
    temp[i][j] = !temp[i][j];
    this.setState({bassMatrix : temp});
    this.loadSequence();
  } 

  // loads the sequence of the song
  // uses specific format required by the library
  loadSequence() {

    // loops through all columns
    for (var i=0;i<16;i++){

      // song in specific library syntax:
      // [[drum1,drum2],[[guitar,[S6+1,S5+3,S4+3],1/4,down][bass,[S6+1,S5+3,S4+3],1/4]]]
      let song=[];

      //drums
      //specific library syntax:[drum1,drum2]
      let drums=[];
      if (this.state.drumsMatrix[0][i]){drums.push(2);}
      if (this.state.drumsMatrix[1][i]){drums.push(17);}
      if (this.state.drumsMatrix[2][i]){drums.push(56);}
      if (this.state.drumsMatrix[3][i]){drums.push(35);}

      //synth
      //specific libary syntax: [synthnumber,[S6+1,S5+3,S4+3],1/4]
      let synths=[837, [], 0.08];
      if (this.state.synthMatrix[0][i]){synths[1].push(72);}
      if (this.state.synthMatrix[1][i]){synths[1].push(70);}
      if (this.state.synthMatrix[2][i]){synths[1].push(67);}
      if (this.state.synthMatrix[3][i]){synths[1].push(66);}
      if (this.state.synthMatrix[4][i]){synths[1].push(65);}
      if (this.state.synthMatrix[5][i]){synths[1].push(63);}
      if (this.state.synthMatrix[6][i]){synths[1].push(60);}
      if (this.state.synthMatrix[7][i]){synths[1].push(58);}

      // bass
      // specific library syntax: [bass,[S6+1,S5+3,S4+3],1/4]
      let bajos=[436, [], 0.07];
      if (this.state.bassMatrix[0][i]){bajos[1].push(48);}
      if (this.state.bassMatrix[1][i]){bajos[1].push(46);}
      if (this.state.bassMatrix[2][i]){bajos[1].push(43);}
      if (this.state.bassMatrix[3][i]){bajos[1].push(42);}
      if (this.state.bassMatrix[4][i]){bajos[1].push(41);}
      if (this.state.bassMatrix[5][i]){bajos[1].push(39);}
      if (this.state.bassMatrix[6][i]){bajos[1].push(36);}
      if (this.state.bassMatrix[7][i]){bajos[1].push(34);}

      //push each instrument array with sounds for the specific i into the song array
      song.push(drums, [synths, bajos]);

      // assign new value in the global song for the specific column 
      this.song[i]=song;
    }
  }

  // starts the loop
  playLoop(){
    this.loadSequence();
    this.setState({looping: true});
    // specific library function: startPlayLoop(song, bpm, bars)
    this.midiSounds.startPlayLoop(this.song, this.bpm, 1/4);
  }

// stops the loop
// function is never called
stopLoop(){
  this.midiSounds.stopPlayLoop();
  this.setState({looping: false});
}

componentDidMount(){
  // function to start loop of sounds
  this.playLoop();
  // function for the visualizations
  this.onSoundTrigger();
}

  // changes between synth, drums or bass screens
  changeGrid=(grid)=>{
    this.setState({currentGrid: grid});
  }

  // changes the state of the 3 instruments' grids
  // calls the function to load the sequence to the specific format
  loadSong=(drums, bass, synth)=> {
    this.setState({
      drumsMatrix: drums,
      bassMatrix: bass,
      synthMatrix: synth
    });
    this.loadSequence();
  }

  // adds a flashlight on/off effect when clicking anywhere on the screen
  // clickEffect=()=>{
  //   document.addEventListener("mouseover", function(e){
  //     var gradient = document.getElementById('cover');
  //     gradient.style.background = 'none';
  //     gradient.style.backgroundImage =
  //       "radial-gradient(ellipse closest-corner at "
  //       + e.clientX + "px " + e.clientY
  //       + "px , rgba(0,0,0,0) 0%, rgba(0,0,0,.9) 50%)";
  //    });
  // }

  // resets the states of the matrices to have no clicked cells
  refresh=()=>{
    this.setState({
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
    });
    this.loadSequence();
  }

  // uses the visInstructions array to determine visualization behaviors
  onSoundTrigger(){

    let interval = 1000*60/this.bpm;

    setInterval(()=> {

      // current time of the loop in seconds
      let currentTime = this.midiSounds.contextTime();
      // math to calculate the current beat
      let currentBeat = Math.floor((currentTime%(16*60/this.bpm))/(60/this.bpm)+ 1);

      // instruction for the specific column
      let currentInstruction = this.state.visInstructions[currentBeat-1];

      // if there is something to be done, i.e there is a drum activated
      if(currentInstruction !== 0){
        // cases where only one of the drums is clicked in a single col
        if(currentInstruction===1){
          //show the viz
          var thisVis = document.getElementById('viz1');
          thisVis.className += ' viz1';
          // make viz disappear after a few seconds
          setTimeout( function() {
            thisVis.classList.remove('viz1');
          }, 1.5*1000*60/this.bpm )
        }
        else if (currentInstruction===2){
          var thisVis = document.getElementById('viz2');
          thisVis.className += ' viz2';
          setTimeout( function() {
            thisVis.classList.remove('viz2');
          }, 1.5*1000*60/this.bpm )
        }
        else if (currentInstruction===4){
          var thisVis = document.getElementById('viz3');
          thisVis.className += ' viz3';
          setTimeout( function() {
            thisVis.classList.remove('viz3');
          }, 1.5*1000*60/this.bpm )
        }
        else if(currentInstruction===8){
          var thisVis = document.getElementById('viz4');
          thisVis.className += ' viz4';
          setTimeout( function() {
            thisVis.classList.remove('viz4');
          }, 1.5*1000*60/this.bpm )
        }
        // cases where there is a combination of drums
        else {
          if (currentInstruction>0 && currentInstruction<5) {
            var thisVis = document.getElementById('viz1');
            thisVis.className += ' viz1';
            setTimeout( function() {
              thisVis.classList.remove('viz1');
            }, 1.5*1000*60/this.bpm )
          }
          if (currentInstruction>4 && currentInstruction<9) {
            var thisVis = document.getElementById('viz2');
            thisVis.className += ' viz2';
            setTimeout( function() {
              thisVis.classList.remove('viz2');
            }, 1.5*1000*60/this.bpm )
          }
          if (currentInstruction>8 && currentInstruction<13) {
            var thisVis = document.getElementById('viz3');
            thisVis.className += ' viz3';
            setTimeout( function() {
              thisVis.classList.remove('viz3');
            },1.5*1000*60/this.bpm )
          }
          if (currentInstruction>12 && currentInstruction<17) {
            var thisVis = document.getElementById('viz4');
            thisVis.className += ' viz4';
            setTimeout( function() {
              thisVis.classList.remove('viz4');
            }, 1.5*1000*60/this.bpm )
          }
        }
      }
    }, interval);
  }

  // createVis=(instruction)=>{
  //   switch(instruction){
  //     case 1:
  //       this.setState({viz1: true});
  //       break;
  //     case 2:
  //       this.setState({viz2: true});
  //       break;
  //     case 4:
  //       this.setState({viz4: true});
  //       break;
  //     case 8:
  //       this.setState({viz8: true});
  //       break;
  //     default:
  //       break;
  //   }
  // }

  render() {
    return (
      <div id='App'>
        <ToggleMenu
          drums={this.state.drumsMatrix}
          synth={this.state.synthMatrix}
          bass={this.state.bassMatrix}
          loadSong={this.loadSong}
          refresh={this.refresh}
          changeGrid={this.changeGrid}/>
        <div>
          {
            this.state.looping
            ? <VerticalLine bpm={this.bpm}/>
            : null
          }
          <MIDISounds ref={(ref) => (this.midiSounds = ref)}/>
          {
            (this.state.currentGrid === 'synth')
            ? <SynthGrid synthMatrix={this.state.synthMatrix} playSynth={this.playSynth}/>
            :
              (this.state.currentGrid === 'drums')
              ? <DrumsGrid drumsMatrix={this.state.drumsMatrix} playDrums={this.playDrums}/>
              :
                (this.state.currentGrid === 'bass')
                ? <BassGrid bassMatrix={this.state.bassMatrix} playBass={this.playBass}/>
                : null
          }
        </div>
        <div className='vizLayout'>
          <Visualize1 />
          <Visualize2 />
          <Visualize4 />
          <Visualize3 />
        </div>
      </div>
      );
  }
}

export default App;
