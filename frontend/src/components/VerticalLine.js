import React, { Component } from 'react';

class VerticalLine extends Component {

  constructor(props){
    super(props);
    this.state = {
    	// 16 * length in s of one beat in that bpm
		time : 16*(60/this.props.bpm),

    }
  }

  render() {
	let style = { 
		animationName: 'move',
		animationIterationCount: 'infinite',
		animationTimingFunction: 'linear',
		animationDuration: this.state.time + 's',
		animationFillMode: 'forwards'
	};
    return (
      <div>
		<div style={ style } className='line'></div>
      </div>
    );
  }
}

export default VerticalLine;
