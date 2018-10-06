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

	createTable = () => {
		let table = []
		// Outer loop to create rows
		for (let i = 0; i < 8; i++){
			let children = []
			// Inner loop to make td elements
			for (let j = 0; j < 16; j++){
				children.push(<td onClick={this.playC.bind(this)}></td>)
			}
			table.push(<tr>{children}</tr>)
		}
		return table;
	}

  render() {
    return (
      <div>
        <MIDISounds ref={(ref) => (this.midiSounds = ref)} appElementName="root" instruments={[3]} />
       
		<table>
			{this.createTable()}
		</table>
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
