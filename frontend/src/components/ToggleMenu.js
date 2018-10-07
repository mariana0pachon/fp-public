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
          <nav class="nav-extended">
            <div class='tabs tabs-transparent'>
                <p class='tab' onClick={()=>this.changeGrid('drums')}><a>drums</a></p>
                <p class='tab' onClick={()=>this.changeGrid('synth')}><a>synth</a></p>
                <p class='tab' onClick={()=>this.changeGrid('bass')}><a>bass</a></p>
            </div>
          </nav>
        );
    }
}


export default ToggleMenu;