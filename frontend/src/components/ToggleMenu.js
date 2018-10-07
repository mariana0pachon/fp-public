import React, { Component } from 'react';

class ToggleMenu extends Component {
    render() {
        return (
          <nav class="header">
            <h1 id="title">Sequencer</h1>
            <button onClick={this.state='bass'}>Bass</button>
            <button onClick={()=>this.state='drums'}>Drums</button>
            <button onClick={()=>this.state='synth'}>Synth</button>
          </nav>
        );
    }
}


export default ToggleMenu;
// //const Menu = ({alignment, children}) => (
//     <div className="menu">
//         <div className={alignment}>{children}</div>
//     </div>
// );
