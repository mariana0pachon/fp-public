import React, { Component } from 'react';
import MIDISounds from 'midi-sounds-react';

class SynthGrid extends Component {

  constructor(){
    super();
    this.state = {
		matrix : [
			[false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
			[false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
			[false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
			[false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
			[false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
			[false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
			[false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
			[false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
		]

    }
  }

  playNote(i,j) {
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

    this.midiSounds.playChordNow(3, [note], 2.5);
	var temp = this.state.matrix;
	temp[i][j] = !temp[i][j];
	this.setState({matrix : temp});
  }

	createTable = () => {
		let table = []
		let key=0;
		// Outer loop to create rows
		for (let i = 0; i < 8; i++){
			let children = []
			// Inner loop to make td elements
			for (let j = 0; j < 16; j++){
				children.push(<td style={this.state.matrix[i][j] ? 
											{background : 'red'} 
											: 
											{background : 'transparent'}} 
											key={key} value={this.state.matrix[i][j]} onClick={()=>this.playNote(i,j)}>
							      <div className='filledcircle'></div>
							  </td>)
				key++;
			}
			table.push(<tr key={key}>{children}</tr>)
		}
		return table;
	}

  render() {
    return (
      <div>
        <MIDISounds ref={(ref) => (this.midiSounds = ref)} appElementName="root" instruments={[3]} />

		<table>
			<tbody>
				{this.createTable()}
			</tbody>
		</table>
      </div>
    );
  }
}

export default SynthGrid;
