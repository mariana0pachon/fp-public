import React, { Component } from 'react';
import './Grids.css';

class BassGrid extends Component {

  constructor(props){
    super(props);
    this.state = {

    }

  }
 	
 	playBass(i, j) {
 		this.props.playBass(i,j);
 	}

 	createTable () {
 		let table = []
 		let key=0;
 		// Outer loop to create rows
 		for (let i = 0; i < 8; i++){
 			let children = []
 			// Inner loop to make td elements
 			for (let j = 0; j < 16; j++){

 				children.push(<td 
          className={this.props.bassMatrix[i][j] 
          ? 'bass neon' 
 					: '' 
 					} 
 					key={key} value={this.props.bassMatrix[i][j]} onClick={()=>this.playBass(i,j)}>
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

		<table>
			<tbody>
				{this.createTable()}
			</tbody>
		</table>

      </div>
    );
  }
}

export default BassGrid;