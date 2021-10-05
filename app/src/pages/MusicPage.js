import Header from "../components/Header";
import {Badge, Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {useHistory, useLocation} from "react-router-dom";
import axiosConfig from "../services/axiosConfig";
import Body from "../components/Body";
import "../styles/MusicPage.css";
import "../styles/Body.css"


const MusicPage = (props) => {
    //this is important to ensure the response data gets passed down to the page
    const [tracks, setTracks] = useState();
    let location = useLocation();
    let history = useHistory();


    let info = location.state.data;


    const loadTracks = async () => {
        await axiosConfig
            .get(`/spotify/get-album-tracks?albumId=${info.id}`)
            .then(response => {
                console.log(response.data);
                setTracks(response.data);
            })
    }

    useEffect(() => {
        console.log(props.d);
        console.log(location.state.data);

        loadTracks()
        console.log(tracks);

    }, [location]);



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
                            <div className="body_info">
                                <img src={info.images[0].url} alt="" />
                                <div className="body_infoText">
                                    <strong> {info.albumType} </strong>
                                    <h2> {info.name} </h2>
                                    <p> {info.artists[0].name} </p>

                                </div>
                            </div>


                        </Container>
                    </Col>
                    <Col></Col>
                </Row>

            </Container>

        </div>
    )
}

export default MusicPage;