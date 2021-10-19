import React from 'react'
import "../styles/SongRow.css"

function SongRow({item, playSong}) {
    const trackArtists = item.track.artists
    const trackAlbum = item.track.album.name
    return (
        <div className="songRow" onClick={() => playSong(item.track.uri)}>
            <img className="songRow_album" src={item.track.album.images[0].url} alt="" />
            <div className="songRow_info">
                <h1>{item.track.name}</h1>
                <p>
                    {trackArtists.map((artist) => artist.name).join(", ")} -{" "}
                    {trackAlbum}
                </p>

            </div>

        </div>
    )
}

export default SongRow