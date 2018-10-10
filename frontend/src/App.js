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

      let song=[];

      //drums
      let drums=[];
      if (this.state.drumsMatrix[0][i]){drums.push(16);}
      if (this.state.drumsMatrix[1][i]){drums.push(17);}
      if (this.state.drumsMatrix[2][i]){drums.push(18);}
      if (this.state.drumsMatrix[3][i]){drums.push(19);}

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

      // bass
      let bajos=[20, [], 2.5];
       if (this.state.bassMatrix[0][i]){bajos[1].push(72)}
       if (this.state.bassMatrix[1][i]){bajos[1].push(71)}
       if (this.state.bassMatrix[2][i]){bajos[1].push(69)}
       if (this.state.bassMatrix[3][i]){bajos[1].push(67)}
       if (this.state.bassMatrix[4][i]){bajos[1].push(65)}
       if (this.state.bassMatrix[5][i]){bajos[1].push(64)}
       if (this.state.bassMatrix[6][i]){bajos[1].push(62)}
       if (this.state.bassMatrix[7][i]){bajos[1].push(60)}
      
      //push everything
      song.push(drums, [synths, bajos]);

      this.song[i]=song;
    }
  }

  playLoop(){
    this.loadSequence();
    this.midiSounds.startPlayLoop(this.song, this.bpm, 1/16);
    this.setState({looping: true});
  }

  stopLoop(){
    this.midiSounds.stopPlayLoop();
    this.setState({looping: false});
  }

  componentDidMount(){
    this.playLoop();
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

  clickEffect=()=>{
    console.log('click function');
    document.addEventListener("mouseover", function(e){
      var gradient = document.getElementById('cover');
      gradient.style.background = 'none';
      gradient.style.backgroundImage = 
        "radial-gradient(ellipse closest-corner at " 
        + e.clientX + "px " + e.clientY 
        + "px , rgba(0,0,0,0) 0%, rgba(0,0,0,.9) 50%)";
    //   setTimeout(function(){
    //   gradient.style.backgroundImage = 
    //     "radial-gradient(ellipse closest-corner at " 
    //     + e.clientX + "px " + e.clientY 
    //     + "px , rgba(0,0,0,0) 0%, rgba(0,0,0,.9) 40%)";
    //   }, 500)
    //   setTimeout(function(){
    //   gradient.style.backgroundImage = 
    //     "radial-gradient(ellipse closest-corner at " 
    //     + e.clientX + "px " + e.clientY 
    //     + "px , rgba(0,0,0,0) 0%, rgba(0,0,0,.9) 30%)";
    //   }, 1000)
    //   setTimeout(function(){
    //   gradient.style.backgroundImage = 
    //     "radial-gradient(ellipse closest-corner at " 
    //     + e.clientX + "px " + e.clientY 
    //     + "px , rgba(0,0,0,0) 0%, rgba(0,0,0,.9) 20%)";
    //   }, 1500)
    //   setTimeout(function(){
    //     gradient.style.background = 'rgba(0,0,0,1)';
    //     gradient.style.backgroundImage = '';
    //   }, 2000)
     });

  }

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


  render() {

    return (
      <div>
        <ToggleMenu 
          drums={this.state.drumsMatrix} 
          synth={this.state.synthMatrix}
          bass={this.state.bassMatrix}
          loadSong={this.loadSong}
          refresh={this.refresh}
          changeGrid={this.changeGrid}/>
        <div onClick={this.clickEffect}>
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
        <div id='cover' className=''></div>
        {this.playLoop.bind(this)}
      </div>
    );
  }
}

export default App;
