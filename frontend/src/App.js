import React, { Component } from 'react';
import './App.css';
import MIDISounds from 'midi-sounds-react';
import ToggleMenu from './components/ToggleMenu';
import SynthGrid from './components/SynthGrid';
import DrumsGrid from './components/DrumsGrid';
import BassGrid from './components/BassGrid';
import VerticalLine from './components/VerticalLine';
import Visualize1 from './components/Visualize1';


class App extends Component {

  constructor(){
    super();
    this.state = {
      viz1:false, 
      viz2: false, 
      viz4: false, 
      viz8: false,
      visInstructions: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      looping: false,
      currentGrid: 'drums',
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

   playSynth=(i,j)=>  {
      var temp = this.state.synthMatrix;
      temp[i][j] = !temp[i][j];
      this.setState({synthMatrix : temp});
      this.loadSequence();
  }

 playDrums=(i,j)=>  {
  let visCmd = 0;
    var temp = this.state.drumsMatrix;
    temp[i][j] = !temp[i][j];
    for (let y=0; y<4; y++){
      if(this.state.drumsMatrix[y][j]){
        visCmd |= 1 << y;
      }
    }
    var visTemp = this.state.visInstructions;
    visTemp[j] = visCmd;

    this.setState({
      drumsMatrix : temp, 
      visInstructions: visTemp,
    });
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

      let song=[];

      //drums
      let drums=[];
      if (this.state.drumsMatrix[0][i]){drums.push(2);}
      if (this.state.drumsMatrix[1][i]){drums.push(17);}
      if (this.state.drumsMatrix[2][i]){drums.push(56);}
      if (this.state.drumsMatrix[3][i]){drums.push(35);}

      //synth
     let synths=[837, [], 0.08];
      if (this.state.synthMatrix[0][i]){synths[1].push(72)}
      if (this.state.synthMatrix[1][i]){synths[1].push(70)}
      if (this.state.synthMatrix[2][i]){synths[1].push(67)}
      if (this.state.synthMatrix[3][i]){synths[1].push(66)}
      if (this.state.synthMatrix[4][i]){synths[1].push(65)}
      if (this.state.synthMatrix[5][i]){synths[1].push(63)}
      if (this.state.synthMatrix[6][i]){synths[1].push(60)}
      if (this.state.synthMatrix[7][i]){synths[1].push(58)}

      // bass
      let bajos=[436, [], 0.07];
       if (this.state.bassMatrix[0][i]){bajos[1].push(48)}
       if (this.state.bassMatrix[1][i]){bajos[1].push(46)}
       if (this.state.bassMatrix[2][i]){bajos[1].push(43)}
       if (this.state.bassMatrix[3][i]){bajos[1].push(42)}
       if (this.state.bassMatrix[4][i]){bajos[1].push(41)}
       if (this.state.bassMatrix[5][i]){bajos[1].push(39)}
       if (this.state.bassMatrix[6][i]){bajos[1].push(36)}
       if (this.state.bassMatrix[7][i]){bajos[1].push(34)}
      
      //push everything
      song.push(drums, [synths, bajos]);

      this.song[i]=song;
    }
  }

  playLoop(){
    this.loadSequence();
    this.setState({looping: true});
    this.midiSounds.startPlayLoop(this.song, this.bpm, 1/4);
  }

  stopLoop(){
    this.midiSounds.stopPlayLoop();
    this.setState({looping: false});
  }

  componentDidMount(){
    this.playLoop();
    this.onSoundTrigger();
  }

  changeGrid=(grid)=>{
    this.setState({currentGrid: grid});
  }

  loadSong=(drums, bass, synth)=> {
    this.setState({
      drumsMatrix: drums, 
      bassMatrix: bass, 
      synthMatrix: synth
    });
    this.loadSequence();
  }

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

  refresh=()=>{

    // for some reason this does not work when the array is a constant ?
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

  onSoundTrigger(){

    let interval = 1000*60/this.bpm;

    setInterval(()=> {
      let currentTime = this.midiSounds.contextTime();
      let currentBeat = Math.floor((currentTime%(16*60/this.bpm))/(60/this.bpm)+ 1);

      let currentInstruction = this.state.visInstructions[currentBeat-1];

      if(currentInstruction !== 0){
        this.createVis(currentInstruction);
        if (currentInstruction===1){
          //this.createViz1();
		  console.log("Should be poofing");
		  var thisVis = document.getElementById('poofy1');
		  thisVis.className += ' poof';
			setTimeout( function() {
				thisVis.classList.remove('poof');
			}, 1500 )
		  
        }
      }
      if (currentBeat===16){
        this.resetVis();
      }

    }, interval);
  }

  createVis=(instruction)=>{
    switch(instruction){
      case 1:
        this.setState({viz1: true});
        break;
      case 2: 
        this.setState({viz2: true});
        break;
      case 4:
        this.setState({viz4: true});
        break;
      case 8:
        this.setState({viz8: true});
        break;
      default:
        break;
    }
  }

  resetVis=()=>{
    this.setState({
      viz1: false, 
      viz2: false, 
      viz3: false, 
      viz4: false,
    })
  }

  createViz1=()=> {
    console.log('called createViz1')
    return <Visualize1/>;
  }

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
        {
          <div id='cover' className=''></div>
        }
		<Visualize1/>
      </div>
    );
  }
}

export default App;
