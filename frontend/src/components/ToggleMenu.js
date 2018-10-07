import React, { Component } from 'react';

class ToggleMenu extends Component {
    render() {
        return (
          <nav class="header">
            <h1 id="title">Sequencer</h1>
            <input type="button" value="Bass"></input>
            <input type="button" value="Drums"></input>
            <input type="button" value="Synth"></input>
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
