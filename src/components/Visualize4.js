import React, { Component } from 'react';
import './Visualize4.css';

class Visualize4 extends Component {

  constructor(){
    super();
  }

  render() {
    return (
      <div className='layout'>
        <div className="egg" id='viz4'>
          <span className="egg-inner"></span>
          <span className="egg-inner"></span>
          <span className='egg-inner'></span>
        </div>
      </div>
    );
  }
}

export default Visualize4;