import Header from "../components/Header";
import {Col, Container, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {useHistory, useLocation} from "react-router-dom";
import axiosConfig from "../services/axiosConfig";
import "../styles/MusicPage.css";
import "../styles/Body.css"
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import SongRow from "../components/SongRow";
import SpotifyPlayer from "../components/SpotifyPlayerCustomer";
import SpotifyHeader from "../components/SpotifyHeader";
import Player from "../components/Player";
import SongRowPlaylist from "../components/SongRowPlaylist";

const PlaylistPage = (props) => {
    //this is important to ensure the response data gets passed down to the page
    const [tracks, setTracks] = useState(null);
    const [playingTrack, setPlayingTrack] = useState();
    let location = useLocation();
    let history = useHistory();


    let info = location.state.data;


    function playSong(uri) {
        setPlayingTrack(uri)
    }

    function playAlbum() {
        console.log(info.uri)
        setPlayingTrack(info.uri)
    }





    useEffect(async () => {

        await axiosConfig
            .get(`/spotify/get-playlist-tracks`, {
                params : {
                    spotifyToken: localStorage.getItem("spotifyToken"),
                    playlistID: info.id
                }
            })
            .then(response => {
                if(response.status === 200) {
                    console.log(response.data);
                    setTracks(response.data.items)
                }

            }).catch((err) => {
                console.log(err);
            })

    }, []);



    return (
        <div>
            <Header/>
            <Container fluid className={"content-body"}>
                <Row className={"justify-content-center"}>
                    <Col>
                        <Row className={"justify-content-end"}>

                        </Row>
                    </Col>
                    <Col sm={8}>
                        <Container className={"rounded-card"}>
                            <SpotifyHeader />
                            <div className="body_info">
                                <img src={info.images[0].url} alt="" />
                                <div className="body_infoText">
                                    <strong> {info.type} </strong>
                                    <h2> {info.name} </h2>
                                    <p> {info.owner.displayName} </p>
                                </div>
                            </div>

                            <div className="body_trackview">

                                {tracks != null ? (tracks.map((item) => (
                                    <SongRowPlaylist playSong={playSong} item={item}/>
                                ))) : <div>Loading</div>}

                            </div>

                        </Container>
                    </Col>
                    <Col></Col>
                </Row>

            </Container>



            <div>
                <Player trackUri={playingTrack} />
            </div>






        </div>
    )
}

export default PlaylistPage;