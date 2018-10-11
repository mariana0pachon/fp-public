import React, { Component } from 'react';
import './Visualize1.css';

class Visualize1 extends Component {

  constructor(){
    super();
  }

  render() {
    return (
      <div className='layout'>
        <div className="loader" >
          <span className="loader__inner"></span>
          <span className="loader__inner"></span>
          <span className='loader__inner'></span>
        </div>
      </div>
    );
  }
}

export default Visualize1;
