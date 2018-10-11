import React, { Component } from 'react';
import './Visualize1.css';

class Visualize1 extends Component {

  constructor(){
    super();
  }

  render() {
    const {beat}=this.props;
	let style = { 
		animationName: 'pop',
		animationIterationCount: '1',
		animationTimingFunction: 'ease-out',
		animationDuration: 1.5 + 's',
		animationFillMode: 'forwards',
		marginLeft: beat
	};
    return (
      <div className="loader" id='poofy1' style={{margin_left : beat}}>
        <span className="loader__inner"></span>
        <span className="loader__inner"></span>
      </div>
    );
  }
}

export default Visualize1;
