import React, {useState, useEffect} from 'react';
import './App.css';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import SideBar from './Components/SideBar/index';
import Playlist from './Components/Playlist';
import Player from './Components/MusicPlayer';
const client = new ApolloClient({
  uri: 'https://api.ss.dev/resource/api'
})
function App() {
  const [playlistId, setPlaylistId] = useState(null);
  const [selectedSong, setSelectedSong] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState([]);
  const [musicList, setMusicList] = useState([]);
  const [songIndex, setSongIndex] = useState(null);
  const [searchKeyWords, setSearchKeyWords] = useState('');
  const setNewPlaySong = (index) => {
    setSongIndex(index);
    setSelectedSong(musicList[index]);
  }
  const searchMusic = (string) => {
    let music = [...musicList].filter(el => {
      return el.title.toLowerCase().includes(string.toLowerCase()) || el.artist.toLowerCase().includes(string.toLowerCase())
    })
    setSearchKeyWords(string);
    setMusicList(music);
  }
  useEffect(() => {
  }, [songIndex, musicList, selectedPlaylist,selectedSong,playlistId]);
  // console.log(songIndex, 'app.js songi');
  console.log(musicList, 'musicList');
  return (
        <ApolloProvider client={client}>
          <div className="application_layout">
            <SideBar
                setPlaylistId={setPlaylistId}
                playlistId={playlistId}
                setSelectedPlaylist={setSelectedPlaylist}
            />
            <Playlist
              selectedPlaylist={selectedPlaylist}
              playlistId={playlistId}
              setSelectedSong={setSelectedSong}
              setMusicList={setMusicList}
              selectedSong={selectedSong}
              setSongIndex={setSongIndex}
              searchKeyWords={searchKeyWords}
              searchMusic={searchMusic}
            />
            <Player
              trackIndex={songIndex}
              songList={musicList}
              setNewPlaySong={setNewPlaySong}
            />
          </div>
        </ApolloProvider>
  );
}
export default App;
