import React, { Component } from 'react';
import './Visualize1.css';

class Visualize1 extends Component {

  constructor(){
    super();
  }

  render() {
    const {beat}=this.props;
    return (
      <div className="loader" style={{'margin-left': beat}}>
        <span className="loader__inner"></span>
        <span className="loader__inner"></span>
      </div>
    );
  }
}

export default Visualize1;
