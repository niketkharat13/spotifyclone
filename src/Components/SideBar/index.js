import React, {useEffect} from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import sidebarCss from './sidebar.module.css';
const SideBar = (props) => {
    return (
        <>
            {
                !props.data.loading ?
                <div className={sidebarCss.playlist}>
                    {
                        props.data.getPlaylists.map((playlist, i) => {
                            return (
                                <ul key={i} onClick={() => {
                                    props.setPlaylistId(playlist.id);
                                    props.setSelectedPlaylist(playlist);
                                }}>
                                    <li className={[sidebarCss.playlist_item, props.playlistId === playlist.id ?sidebarCss.active_playlist : ''].join(' ')}>
                                        {playlist.title}
                                    </li>
                                </ul>
                            )
                        })
                    }
                </div> : <p style ={{
                    color: 'white',
                    margin: 'auto',
                    fontSize: '25px'
                }}>Loading</p> 
            }
        </>
    )
}
const query = gql`
    {
        getPlaylists {
            id
            title
        }
    }
`
export default graphql(query)(SideBar);
