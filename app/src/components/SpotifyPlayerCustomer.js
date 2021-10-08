import React from "react";
import "../styles/SpotifyPlayer.css";

import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";

import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import RepeatIcon from "@material-ui/icons/Repeat";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import { Grid, Slider } from "@material-ui/core";



function SpotifyPlayer({track, album}) {
    return (
        <div className="spotifyplayer">
            <div className="spotifyplayer_left">
                <img className="spotifyplayer_albumLogo" src={album.images[0].url} alt="" />
                <div className="spotifyplayer_songInfo">
                    <h4> {album.name} </h4>
                    <p>{album.artists[0].name}</p>
                </div>
            </div>
            <div className="spotifyplayer_center">
                <ShuffleIcon className="spotifyplayer_green"/>
                <SkipPreviousIcon className="spotifyplayer_icon" />
                <PlayCircleOutlineIcon fontSize="large" className="spotifyplayer_icon" />

                <SkipNextIcon className="spotifyplayer_icon" />
                <RepeatIcon className="spotifyplayer_green"/>


            </div>
            <div className="spotifyplayer_right">
                <Grid container spacing={2}>
                    <Grid item>
                        <PlaylistPlayIcon />
                    </Grid>
                    <Grid item>
                        <VolumeDownIcon />
                    </Grid>
                    <Grid item xs>
                        <Slider aria-labelledby="continuous-slider" />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}


export default SpotifyPlayer;
