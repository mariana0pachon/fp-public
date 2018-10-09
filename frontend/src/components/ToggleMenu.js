import React, { Component } from 'react';
import './ToggleMenu.css';
import {Row, Button, Input} from 'react-materialize';

class ToggleMenu extends Component {

    constructor(props){
        super(props);
        this.state={
            savingSong: false,
            openingSong: false,
            songTitle: ''
        }
    }

    changeGrid (grid){
        this.props.changeGrid(grid);
    }

    saveSong (){
        this.setState({savingSong: true});

    }

    openSong(){
        this.setState({openingSong: true});
    }

    cancel(){
        this.setState({savingSong: false});
        this.setState({openingSong: false});
    }

    onTitleChange = (event) => {
        this.setState({songTitle: event.target.value});
    }

    newSongSubmit(){
        this.cancel();
        fetch('http://localhost:3000/save', {
            method: 'post', 
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({
                name: this.state.songTitle, 
                drums: this.props.drums, 
                synth: this.props.synth, 
                bass: this.props.bass
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.name !== 'error')
                alert("Your song '" + data.name + "' has been saved successfully!" );
            else
                alert ("A song named '" + this.props.songTitle +"'already exists. Please pick a new name.");
        })
    }

    oldSongSubmit(){
        this.cancel();
        fetch('http://localhost:3000/load', {
            method: 'post', 
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({
                name: this.state.songTitle, 
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data === 'no such song') {alert("'"+this.state.songTitle+"'"+" is not a saved song.")}
            else {this.props.loadSong(data.drums, data.bass, data.synth)}
        })
    }

    render() {
        return (
            <div>
                <nav className="nav-extended">
                    <div className='tabs tabs-transparent'>
                        <p className='tab' onClick={()=>this.changeGrid('drums')}><a>drums</a></p>
                        <p className='tab' onClick={()=>this.changeGrid('synth')}><a>synth</a></p>
                        <p className='tab' onClick={()=>this.changeGrid('bass')}><a>bass</a></p>
                        <p className='tab' onClick={()=>this.saveSong()}><a>save</a></p>
                        <p className='tab' onClick={()=>this.openSong()}><a>open</a></p>
                    </div>
                </nav>
                {
                    (this.state.savingSong || this.state.openingSong)
                    ?   <div className='popup'>
                            <div className='popup-inner'>
                                <Row>
                                    <Input onChange={this.onTitleChange} label="Song title" />
                                    <Button onClick={()=>this.cancel()} floating large className='red' waves='light' icon='delete' />
                                    {
                                        this.state.savingSong
                                        ?   <Button onClick={()=>this.newSongSubmit()} floating large className='green' waves='light' icon='add' />
                                        : this.state.openingSong
                                            ?   <Button onClick={()=>this.oldSongSubmit()} floating large className='blue' waves='light' icon='add' />
                                            : null
                                    }
                                </Row>
                            </div>
                        </div>
                    : null
                }
            </div>
        );
    }
}


export default ToggleMenu;