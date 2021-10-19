import React, {useEffect, useState} from "react";
import SpotifyPlayer from "react-spotify-web-playback";

export default function Player({trackUri}) {

    const [play, setPlay] = useState(false)


    useEffect(()=> setPlay(true), [trackUri])

    return (<SpotifyPlayer
        token={localStorage.getItem("spotifyToken")}
        showSaveIcon
        uris={trackUri ? [trackUri] : []}
    />)
}
