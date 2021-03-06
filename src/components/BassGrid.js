import React, { Component } from 'react';
import './Grids.css';

class BassGrid extends Component {

  constructor(props){
    super(props);
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
          ? 'bass neon my-td' 
 					: 'my-td' 
 					} 
 					key={key} value={this.props.bassMatrix[i][j]} onClick={()=>this.playBass(i,j)}>
 				</td>)
 				key++;
 			}
      table.push(<tr className='my-tr'key={key}>{children}</tr>)
 		}
 		return table;
 	}

  render() {
    return (
      <div>
		    <table className='my-table'>
          <tbody>
				    {this.createTable()}
          </tbody>
		    </table>
      </div>
    );
  }
}

export default BassGrid;