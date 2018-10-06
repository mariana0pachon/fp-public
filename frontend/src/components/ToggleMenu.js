import React, { Component } from 'react';

class ToggleMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false
        };

        this.toggleMenu = this.toggleMenu.bind(this);
    }

    toggleMenu() {
        this.setState({visible: !this.state.visible})
    }

    render() {
        return (
            <div>
                <button onClick={this.toggleMenu}>Show Right Menu!</button>
                {this.state.visible && <Menu alignment="right">
                <MenuItem hash="first-page">Synth</MenuItem>
                <MenuItem hash="second-page">Second Page</MenuItem>
                <MenuItem hash="third-page">Third Page</MenuItem>
                </Menu>}
            </div>
        );
    }
}


// //const Menu = ({alignment, children}) => (
//     <div className="menu">
//         <div className={alignment}>{children}</div>
//     </div>
// );
