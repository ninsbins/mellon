import { useState, useEffect } from "react"
import SpotifyPlayer from "react-spotify-web-playback"
import "../styles/SpotifyWebPlayer.css";
import React from "react";
import { Navbar } from "react-bootstrap";

import "../styles/Header.css"
import "../styles/Home.css"

export default function Player({trackUri }) {
    const [play, setPlay] = useState(false)

    useEffect(() => setPlay(true), [trackUri])

    return (
        <Navbar fixed={"bottom"}>
        <SpotifyPlayer
            token={localStorage.getItem("spotifyToken")}
            showSaveIcon
            callback={state => {
                if (!state.isPlaying) setPlay(false)
            }}
            play={play}
            uris={trackUri ? [trackUri] : []}
        />
        </Navbar>
    )
}
