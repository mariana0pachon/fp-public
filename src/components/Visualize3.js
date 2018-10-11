import React, { Component } from 'react';
import './Visualize3.css';

class Visualize3 extends Component {

  constructor(){
    super();
  }

  render() {
    return (
      <div className='layout'>
        <div className="third" id='viz3'>
          <span className="third-inner"></span>
          <span className="third-inner"></span>
          <span className='third-inner'></span>
        </div>
      </div>
    );
  }
}

export default Visualize3;