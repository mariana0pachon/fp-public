import React, { Component } from 'react';

class VerticalLine extends Component {

  constructor(){
    super();
    this.state = {
		time : 5

    }
  }

  render() {
	  let keyframes = 
		  `@-webkit-keyframes move {
			  0% {
				width: 0;
			  }
			  100% {
				width: 100%;
			  }
		  }`;
	let style = { 
		animationName: 'move',
		animationIterationCount: 'infinite',
		animationTimingFunction: 'linear',
		animationDuration: this.state.time + 's',
		animationFillMode: 'forwards'
	};
    return (
      <div>
		<div style={ style } class='line'></div>
      </div>
    );
  }
}

export default VerticalLine;
