import React, { Component } from 'react';
import './App.css';

//create variable css for global white color
let defaultStyle = {
  color: '#fff'
}

//create fake data for dummy data
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

//Create Plalist Counter for app
class PlaylistCounter extends Component {
  render () {
    return (
      <div style={{ ...defaultStyle, width: '40%', display: 'inline-block' }}>
        <h2>{this.props.playlists && this.props.playlists.length} Playlist</h2>
      </div>
    );
  }
}

//Create Component Hours for app
class HoursCounter extends Component {
  render () {

    //Reduce array or combine array song tobe one array
    let allSongs = this.props.playlists.reduce((song, eachPlaylist) => {
      return song.concat(eachPlaylist.songs)
    }, [])

    //Reduce array duration to find sum duration / sum/total song duration
    //Create Component Filter for app
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

//Create Component Filter for app
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

//Create Component Playlist for app
class Playlist extends Component {
  render () {
    let playlist = this.props.playlist
    return (
      <div style={{ ...defaultStyle, width: "25%", display: "inline-block" }}>
        <img src="" alt=""/>
        <h3>{playlist.name}</h3>
          <ul>
            {playlist.songs.map((song, id) => 
              <li key={id}>{song.name}</li>
            )}
          </ul>
      </div>
    );
  }
}

class App extends Component {

  //Create State for all Component all code refer to this
  constructor() {
    super()
    this.state = {
      
      serverData: {},
      filterString: ''
  
    }
  }


  //do function set timeout after render component
  componentDidMount() {
    setTimeout(() => {
      this.setState({serverData: fakeServerData});
    }, 1000);
  }

  //render components
  render() {
    
    //create variable playListToRender, the playListToRender contain data already filter with Filter component, but if not set the playListTOrender will return null array[]
    let playListToRender = this.state.serverData.user ? this.state.serverData.user.playlists.filter( playlist => playlist.name.toLowerCase().includes(this.state.filterString.toLowerCase())
) : []

    return (
      <div className="App">
        {/* Check data if state.serverData.user already set or not, if already set it will return all component, if not it will be show loading  */}     
        {this.state.serverData.user ?
          <div>
            <h1>{this.state.serverData.user.name}'s Playlists
            </h1>

            {/* create prop playlist for PlaylistCounter with data already filter*/}
            <PlaylistCounter playlists={playListToRender} />

            {/* create prop playlist for HoursCounter with data already filter*/}
            <HoursCounter  playlists={playListToRender}/>

             {/* create prop onTextChange for Filter with object text*/}
            <Filter onTextChange = {text => this.setState({filterString:text})} />

            {/* Loopong for playlist data */}
            {
              playListToRender.map( (playlist, id ) => { 
                 return <Playlist key={id} playlist={playlist}/>
              })
            }

          </div> : <h1>Loading...</h1>
        }
      </div>
    );
  }
}

export default App;
