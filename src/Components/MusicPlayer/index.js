import React, {useState, useEffect} from 'react';
import musicPlayerCSS from './musicplayer.module.css';
import { Icon } from '@iconify/react';
const Player = (props) => {
    // console.log(props.songList, 'songList123')
    const [trackIndex, setTrackIndex] = useState(props.trackIndex);
    const [isPlaying, setIsPlaying] = useState(true);
    const [updateTimer, setUpdateTimer] = useState(null);
    const [isMuted, setIsMuted] = useState(false);
    const [seekSliderValue, setSeekSliderValue] = useState(0);
    let [audioElement , setAudioElement] = useState(false);
    function prevTrack() {
        props.setNewPlaySong(trackIndex > 0 ? trackIndex - 1 : props.songList.length - 1);
        loadTrack(trackIndex);
        playTrack();
    }
    useEffect(() => {
        if (props.songList.length > 0 && props.trackIndex != null) {
            setAudioElement(document.createElement('audio'));
        }
    }, [props.songList, props.trackIndex]);
    useEffect(() => {
        if (audioElement && props.songList && props.trackIndex != null) {
            console.log("inside", )
            loadTrack(trackIndex);
        }
        setTrackIndex(props.trackIndex);
    }, [audioElement, trackIndex, props.songList, props.trackIndex]);
    function nextTrack() {
        props.setNewPlaySong(trackIndex < props.songList.length - 1 ? trackIndex + 1 : 0);
        loadTrack(trackIndex);
        playTrack();
    }
    function playTrack() {
        audioElement.play();
        setIsPlaying(true);
    }
    function loadTrack(track_index) {
        if (audioElement) {
            clearInterval(updateTimer);
            resetValues();
            let audioElementUpdate = audioElement;
            audioElementUpdate.src = props.songList[track_index]?.url;
            audioElementUpdate.load();
            setUpdateTimer(setInterval(seekUpdate, 1000))
            audioElementUpdate.play();
            audioElementUpdate.addEventListener("ended", nextTrack);
            setAudioElement(audioElementUpdate)
        }
        // Clear the previous seek timer
    }
    function resetValues() {
        // isReset(true)
        setSeekSliderValue(0);
    }
    function playpauseTrack() {
        if (!isPlaying) playTrack();
        else pauseTrack();
    }
    function pauseTrack() {
        // Pause the loaded track
        audioElement.pause();
        setIsPlaying(false);
    }
    function seekUpdate() {
        let seekPosition = 0;
        
        if (!isNaN(audioElement.duration)) {
          seekPosition = audioElement.currentTime * (100 / audioElement.duration);
          setSeekSliderValue(seekPosition);
        
          // Calculate the time left and the total duration
          let currentMinutes = Math.floor(audioElement.currentTime / 60);
          let currentSeconds = Math.floor(audioElement.currentTime - currentMinutes * 60);
          let durationMinutes = Math.floor(audioElement.duration / 60);
          let durationSeconds = Math.floor(audioElement.duration - durationMinutes * 60);
        
          // Add a zero to the single digit time values
          if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
          if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
          if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
          if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
        
          // Display the updated duration
        //   curr_time.textContent = currentMinutes + ":" + currentSeconds;
        //   total_duration.textContent = durationMinutes + ":" + durationSeconds;
        }
      }
      function seekTo() {
        let audioElementUpdate = audioElement;
        audioElementUpdate.currentTime = audioElement.duration * (seekSliderValue / 100);
        setAudioElement(audioElementUpdate)
      }
    //   console.log(trackIndex, 'trackindex');
    return (
        props.songList.length > 0 && props.trackIndex != null ? <div className={musicPlayerCSS.player}>
            <div className={musicPlayerCSS.details}>
                <div className={musicPlayerCSS.trackDetails}>
                    <div className={musicPlayerCSS.trackname}>{props.songList[trackIndex]?.title}</div>
                    <div className={musicPlayerCSS.trackartist}>{props.songList[trackIndex]?.artist}</div>
                </div>
                <img src={props.songList[trackIndex]?.photo} style={{
                    width: '350px',
                    height: '370px',
                    objectFit: 'cover'
                }} />
            </div>
            <div className={musicPlayerCSS.slider_container}>
                <input type="range" min="1" max="100"
                    value={seekSliderValue} className={musicPlayerCSS.seek_slider} onChange={seekTo}/>
            </div>
            <div className={musicPlayerCSS.buttons}>
                <div className={musicPlayerCSS.options}>
                    <Icon icon="ph:dots-three-circle" />
                </div>
                <div className={musicPlayerCSS.maincontrols}>
                    <div className={musicPlayerCSS.prevtrack} onClick={prevTrack}>
                        <Icon icon="bx:bx-skip-previous" />
                    </div>
                    <div className={musicPlayerCSS.playpausetrack} onClick={playpauseTrack}>
                        <Icon icon={!isPlaying ? "codicon:play" : "bi:pause"} />
                    </div>
                    <div className={musicPlayerCSS.nexttrack} onClick={nextTrack}>
                        <Icon icon="bx:bx-skip-next" />
                    </div>
                </div>
                <div className={musicPlayerCSS.soundIcon} onClick={() => {
                    let audioElUpdate = audioElement;
                    audioElUpdate.muted = !audioElUpdate.muted;
                    setIsMuted(!isMuted);
                }}>
                    <Icon icon={!isMuted ? "akar-icons:sound-on" : 'akar-icons:sound-off'} />
                </div>
            </div>
        </div>: props.songList.length > 0 && <p style={{
                color: 'white',
                margin: '301px auto auto auto',
                fontSize: '25px'
        }}>Select Song First</p>
    )
}
export default Player;