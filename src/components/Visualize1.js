import React, { Component } from 'react';
import './Visualize1.css';

class Visualize1 extends Component {

  constructor(){
    super();
  }

  render() {
    return (
      <div className='layout'>
        <div className="circle" >
          <span className="circle-inner"></span>
          <span className="circle-inner"></span>
          <span className='circle-inner'></span>
        </div>
      </div>
    );
  }
}

export default Visualize1;
