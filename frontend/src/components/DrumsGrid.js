import React, { Component } from 'react';

class DrumsGrid extends Component {

  constructor(props){
    super(props);
    this.state = {

    }

  }
 	
 	playDrums(i, j) {
 		this.props.playDrums(i,j);
 	}

 	createTable () {
 		let table = []
 		let key=0;
 		// Outer loop to create rows
 		for (let i = 0; i < 4; i++){
 			let children = []
 			// Inner loop to make td elements
 			for (let j = 0; j < 16; j++){

 				children.push(<td 
          className={this.props.drumsMatrix[i][j] 
          ? 'drums neon' 
          : '' 
          } 
  				key={key} value={this.props.drumsMatrix[i][j]} onClick={()=>this.playDrums(i,j)}>
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

export default DrumsGrid;