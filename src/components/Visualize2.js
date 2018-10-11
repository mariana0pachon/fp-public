import React, { Component } from 'react';
import './Visualize2.css';

class Visualize2 extends Component {

  constructor(){
    super();
  }

  render() {
    return (
      <div className='layout'>
        <div className="square" id='viz2'>
          <span className="square-inner"></span>
          <span className="square-inner"></span>
          <span className='square-inner'></span>
        </div>
      </div>
    );
  }
}

export default Visualize2;
