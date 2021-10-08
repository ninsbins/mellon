import React, {useEffect, useState} from "react";
import "../styles/Body.css"
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import axiosConfig from "../services/axiosConfig";
import SongRow from "./SongRow";


function Body({parentToChild}) {
    const album = parentToChild;
    const [tracks, setTracks] = useState(null)

    const loadTracks = async () => {
        axiosConfig
            .get(`/spotify/get-album-tracks?albumId=${parentToChild.id}`)
            .then(response => {

                setTracks(response.data);

            });

        console.log(tracks);
    }

    useEffect(async () => {

        //get all songs in the album
       loadTracks();

    }, []);

    return (
        <div className="body">

            <div className="body_info">
                <img src={album.images[0].url} alt="" />
                <div className="body_infoText">
                    <strong> {album.albumType} </strong>
                    <h2> {album.name} </h2>
                    <p> {album.artists[0].name} </p>

                </div>
            </div>

            <div className="body_trackview">
                <div className="body_icons">
                    <PlayCircleFilledIcon className="body__shuffle"/>
                </div>
                <div>{console.log(tracks)}</div>

                















            </div>

        </div>
    );
}

export default Body;
