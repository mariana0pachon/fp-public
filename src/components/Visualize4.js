import React, { Component } from 'react';
import './Visualize4.css';

class Visualize4 extends Component {

  constructor(){
    super();
  }

  render() {
    return (
      <div className='layout'>
        <div className="viz4" >
          <span className="viz4-inner"></span>
          <span className="viz4-inner"></span>
          <span className='viz4-inner'></span>
        </div>
      </div>
    );
  }
}

export default Visualize4;
