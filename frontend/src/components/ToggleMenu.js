import React, { Component } from 'react';

class ToggleMenu extends Component {

    constructor(props){
        super(props);
    }

    changeGrid (grid){
        this.props.changeGrid(grid);
    }

    render() {
        return (
          <nav class="header">
            <button onClick={()=>this.changeGrid('bass')}>Bass</button>
            <button onClick={()=>this.changeGrid('drums')}>Drums</button>
            <button onClick={()=>this.changeGrid('synth')}>Synth</button>
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
