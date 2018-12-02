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

    // change the instrument grid
    changeGrid (grid){
        this.props.changeGrid(grid);
    }

    // change state of savingSong for post request later
    saveSong (){
        this.setState({savingSong: true});
    }

    // change state of openingSong for post request later
    openSong(){
        this.setState({openingSong: true});
    }

    // change state of saving and opening to go back to normal
    cancel(){
        this.setState({savingSong: false});
        this.setState({openingSong: false});
    }

    // event for when the title of the song is chosen
    onTitleChange = (event) => {
        this.setState({songTitle: event.target.value});
    }

    // does post request to the server to save the song in the database
    // stores title (string), states of all instruments (arrays of arrays)
    newSongSubmit(){
        if (this.state.songTitle !== undefined && this.state.songTitle !== ''){
            this.cancel()

            fetch('https://intense-cove-30974.herokuapp.com/save', {
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
        else {
            alert("Please enter a valid title for your new song.");
        } 
        this.setState({songTitle: ''});
    }

    // does post request to the server to get a song in the database
    // takes title (string), returns states of all instruments (arrays of arrays)
    oldSongSubmit(){
        if (this.state.songTitle !== undefined && this.state.songTitle !== ''){
            this.cancel();
            fetch('https://intense-cove-30974.herokuapp.com/load', {
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
        else {
            alert("Please enter a valid title for the song you wish to listen to.");
        } 
        this.setState({songTitle: ''});
    }

    refresh () {
        this.props.refresh();
    }

    render() {
        return (
            <div>
                <nav className="nav-extended black">
                    <div className='tabs tabs-transparent'>
                        <p className='tab neon' onClick={()=>this.changeGrid('drums')}><a>drums</a></p>
                        <p className='tab neon' onClick={()=>this.changeGrid('synth')}><a>synth</a></p>
                        <p className='tab neon' onClick={()=>this.changeGrid('bass')}><a>bass</a></p>
                        <p className='tab neon' onClick={()=>this.saveSong()}><a>save</a></p>
                        <p className='tab neon' onClick={()=>this.openSong()}><a>open</a></p>
                    </div>
                </nav>
                {
                    (this.state.savingSong || this.state.openingSong)
                    ?   <div className='popup'>
                            <div className='popup-inner'>
                                <Row>
                                    <Input style={{color: 'white'}}onChange={this.onTitleChange} label="Song title" />
                                    <Button onClick={()=>this.cancel()} floating large className='red' waves='light' icon='delete' />
                                    {
                                        this.state.savingSong
                                        ?   <Button onClick={()=>this.newSongSubmit()} floating large className='green' waves='light' icon='send' />
                                        : this.state.openingSong
                                            ?   <Button onClick={()=>this.oldSongSubmit()} floating large className='blue' waves='light' icon='cloud' />
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