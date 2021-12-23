import React, { useEffect, useState } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import playlistCss from './playlist.module.css';
const query = gql`
    query GetSongs($playlistId: Int!) {
        getSongs(playlistId: $playlistId) {
            _id
            title
            photo
            url
            duration
            artist
        }
    }
`
const Playlist = (props) => {
    useEffect(() => {
        if (props?.data?.getSongs) {
            props.setMusicList(props.data.getSongs);
        }
    }, [props.playlistId, props.searchKeyWords]);
    return (
        props.playlistId != null ? <>
            {
                !props.data.isloading ? 
                <div className={playlistCss.playlist_songs}>
                    <ul>
                        <h1>{props.selectedPlaylist.title}</h1>
                        <div className={playlistCss.searchbox}>
                            <input type="text" value={props.searchKeyWords} onChange={(e) => {
                                    props.searchMusic(e.target.value);
                                }}
                                placeholder='Search Song, Artist'
                            />
                        </div>
                        {
                            props.data.getSongs?.map((song, i) => {
                                if (song.title.toLowerCase().includes(props.searchKeyWords.toLowerCase()) || song.artist.toLowerCase().includes(props.searchKeyWords.toLowerCase())) {
                                    let minutes = Math.floor(song.duration / 60);
                                    let second = song.duration - minutes * 60
                                    return (
                                        <li key={i}>
                                            <div className={[playlistCss.songDetails, props.selectedSong._id === song._id ? playlistCss.activesong : ''].join(' ')} onClick={() => {
                                                props.setSelectedSong(song);
                                                props.setMusicList(props.data.getSongs);
                                                props.setSongIndex(i);
                                            }}>
                                                <span>
                                                    <img src={song.photo} className={playlistCss.songPhoto} alt=''/>
                                                </span>
                                                <span className={playlistCss.songInfo}>
                                                    <div>
                                                        <h2>{song.title}</h2>
                                                        <p>{song.artist}</p>
                                                    </div>
                                                    <span>{`${minutes}:${second}`}</span>
                                                </span>
                                            </div>
                                        </li>
                                    )
                                }
                            })
                        }
                    </ul>
                </div> : <p>loading</p>
            }
        </> : <p style={{
            color:'white',
            margin: 'auto',
            fontSize:'25px'
        }}>Plase select playlist first</p>
    )
}
export default graphql(query, {
    options: (props) => {
        return {
            variables: {
                playlistId: props.playlistId
            }
        }
    }
})(Playlist);