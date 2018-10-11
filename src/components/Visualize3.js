import React, { Component } from 'react';
import './Visualize3.css';

class Visualize3 extends Component {

  constructor(){
    super();
  }

  render() {
    return (
      <div className='layout'>
        <div className="viz3" >
          <span className="viz3-inner"></span>
          <span className="viz3-inner"></span>
          <span className='viz3-inner'></span>
        </div>
      </div>
    );
  }
}

export default Visualize3;
