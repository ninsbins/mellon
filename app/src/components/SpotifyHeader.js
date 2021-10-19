import React, {useEffect, useState} from "react";
import "../styles/SpotifyHeader.css"

import {Avatar} from "@material-ui/core";
import {Button} from "react-bootstrap";
import axiosConfig from "../services/axiosConfig";


function SpotifyHeader({handleClick}) {

    const [spotifyUser, setSpotifyUser] = useState(null);
    const [spotifyUserImage, setSpotifyUserImage] = useState(null);

    useEffect(async () => {

        await axiosConfig
            .get(`/spotify/get-current-user-image`, {
                params : {
                    spotifyToken: localStorage.getItem("spotifyToken")
                }
            })
            .then(response => {
                if(response.status === 200) {
                    console.log(response.data[1]);
                    setSpotifyUser(response.data[0]);
                    setSpotifyUserImage(response.data[1]);
                }

            }).catch((err) => {
                console.log(err);
            })

    }, []);


    return (
        <div className="spotifyheader">
            <div className="spotifyheader_left">
                <Button
                    variant="default"
                    style={{background: "#1ed760",
                        borderTopLeftRadius: "20px",
                        borderTopRightRadius: "20px",
                        borderBottomRightRadius: "20px",
                        borderBottomLeftRadius: "20px"}}
                    onClick={() => handleClick()}
                    >
                    Share to Feed!

                </Button>

            </div>
            <div className="spotifyheader_right">
                <Avatar src={spotifyUserImage} alt="KD"/>
                <h4>{spotifyUser}</h4>
            </div>
        </div>
    )
}

export default SpotifyHeader;