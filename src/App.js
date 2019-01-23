import React, { Component } from 'react';
import './App.css';


let defaultStyle = {
  color: '#fff'
}

let fakeServerData = {
    user: {
      name: 'Ferry',
      playlists: [
        {
          name: 'my Favorite Song',
          songs: [
             { name: 'tst1', duration: 1234 }, 
             { name: 'tst2', duration: 5000 }, 
             { name:'tst3', duration: 6000 }, 
             { name:'tst4', duration: 7000 }
        ]
        },
        {
          name: 'my ss',
          songs: [
            { name: 'tst5', duration: 1234 }, 
            { name: 'tst2', duration: 5000 }, 
            { name:'tst3', duration: 6000 }, 
            { name:'tst4', duration: 7000 }
        ]
        },
        {
          name: 'my tt',
          songs: [
            { name: 'tst1', duration: 1234 }, 
            { name: 'tst2', duration: 5000 }, 
            { name:'tst3', duration: 6000 }, 
            { name:'tst4', duration: 7000 }
        ] 
        },
        {
          name: 'my ggg',
          songs: [
            { name: 'tst1', duration: 1234 }, 
            { name: 'tst2', duration: 5000 }, 
            { name:'tst3', duration: 6000 }, 
            { name:'tst4', duration: 7000 }
        ]
        },
      ]
    }
}

class PlaylistCounter extends Component {
  render () {
    return (
      <div style={{ ...defaultStyle, width: '40%', display: 'inline-block' }}>
        <h2>{this.props.playlists && this.props.playlists.length} Playlist</h2>
      </div>
    );
  }
}


class HoursCounter extends Component {
  render () {

    let allSongs = this.props.playlists.reduce((song, eachPlaylist) => {
      return song.concat(eachPlaylist.songs)
    }, [])

  

    let totalDuration = allSongs.reduce((sum, eachSong) => {
      return sum + eachSong.duration
    }, 0)

    return (
      <div style={{ ...defaultStyle, width: '40%', display: 'inline-block' }}>
        <h2>{Math.round(totalDuration/60)} Hours</h2>
      </div>
    );
  }
}

class Filter extends Component {
  render () {
    return (
      <div style={defaultStyle}>
        <img src="" alt=""/>      
        <input type="text"  onKeyUp={event => this.props.onTextChange(event.target.value) } /> 
      </div>
    );
  }
}

class Playlist extends Component {
  render () {
    let playlist = this.props.playlist
    return (
      <div style={{ ...defaultStyle, width: "25%", display: "inline-block" }}>
        <img src="" alt=""/>
        <h3>{playlist.name}</h3>
          <ul>
            {playlist.songs.map(song =>
              <li>{song.name}</li>
            )}
          </ul>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      
      serverData: {},
      filterString: ''
  
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({serverData: fakeServerData});
    }, 1000);
  }

  render() {

    let playListToRender = this.state.serverData.user ? this.state.serverData.user.playlists.filter( playlist => playlist.name.toLowerCase().includes(this.state.filterString.toLowerCase())) : []

    return (
      <div className="App">

        {this.state.serverData.user ?
          <div>
            <h1>{this.state.serverData.user.name}'s Playlists
            </h1>
            <PlaylistCounter playlists={playListToRender} />
            <HoursCounter  playlists={playListToRender}/>
            <Filter onTextChange = {text => this.setState({filterString: text})} />
            {
              playListToRender.map( playlist => 
                 <Playlist playlist={playlist}/>
              )
            }

          </div> : <h1>Loading...</h1>
        }
      </div>
    );
  }
}

export default App;
