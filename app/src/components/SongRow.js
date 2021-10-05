import React from 'react'

function SongRow({track}) {
    return (
        <div className="songRow">
            <div className="songRow_info">
                <h1>{console.log(track)}</h1>
                <h1>{track.items[0].name}</h1>




            </div>

        </div>
    )
}

export default SongRow