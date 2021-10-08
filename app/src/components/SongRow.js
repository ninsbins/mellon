import React from 'react'
import "../styles/SongRow.css"

function SongRow({track, album, playSong}) {
    return (
        <div className="songRow" onClick={() => playSong(track.uri)}>
            <img className="songRow_album" src={album.images[0].url} alt="" />
            <div className="songRow_info">

                <h1>{track.name}</h1>

                <p>
                    {track.artists.map((artist) => artist.name).join(", ")} -{" "}
                    {album.name}
                </p>

            </div>

        </div>
    )
}

export default SongRow