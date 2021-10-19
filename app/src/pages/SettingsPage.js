import Header from "../components/Header";
import {Button, Col, Container, Form, Image, Nav, Row, Tab} from "react-bootstrap";
//import './SpotifyButton.css'

import axiosConfig from "../services/axiosConfig";
import React, {useEffect, useState} from "react";
import authService from "../services/authService";
import {useHistory} from "react-router-dom";
import axios from "axios";
import Player from "../components/Player";


const SettingsPage = () => {
    let history = useHistory();

    const [userID, setUserID] = useState("");
    const [connectedToSpotify, setConnectedToSpotify] = useState(false);


    useEffect(() => {
        const jsObject = authService.getCurrentUser();
        //console.log("getting user details: " + JSON.stringify(jsObject));
        //console.log("ID of current logged in User: " + jsObject.id);
        setUserID(jsObject.id);
        console.log("Double checking User's ID: " + userID);
        if(localStorage.getItem("spotifyToken")) {
            setConnectedToSpotify(true);
            const url = window.location.href;

            if((url.split("=")).length > 1) {
                const token = url.split("=").pop();
                localStorage.setItem("spotifyToken", token);
                console.log(localStorage.getItem("spotifyToken"));
            }

        }
    })

    function changePassword() {
        console.log("CLICKED - on change password!");
        history.push("/update-password/" + userID);
        //need to create another route and component!
    }

    function changeUserDetails() {
        console.log("CLICKED - on change User deets!");
        history.push("/update-user/" + userID);
    }


    const connectToSpotify = async () => {
        //do something
        await axiosConfig
            .get(`/spotify/login`)
            .then(response => {
                console.log(response);
                window.location.replace(response.data);
                localStorage.setItem("spotifyToken", "temp");
            });
    }

    const handleLogout = async () => {
        // how to logout
        console.log(localStorage.getItem('user'))
        authService.logout();
        console.log(localStorage.getItem('user'))
        history.push(
            {pathname: `/`}
        );

    }

    return (
        <div>
            <Header/>
            <Container fluid className={"content-body"}>

                <Tab.Container defaultActiveKey={"settings"}>
                    <Row className={"justify-content-center"}>
                        <Col className={"justify-content-end"}>
                            <Nav variant={"pills"} className={"flex-column"}>
                                <Nav.Item>
                                    <Nav.Link eventKey={"settings"}>
                                        Settings
                                    </Nav.Link>
                                </Nav.Item>

                                <Nav.Item>
                                    <Nav.Link eventKey={"connections"}>
                                        Account Connections
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <Button variant="outline-danger" onClick={handleLogout} style={{marginTop: "20px"}}>
                                Logout
                            </Button>
                        </Col>
                        <Col sm={6}>
                            <Tab.Content>

                                <Tab.Pane eventKey={"settings"}>
                                    <Container className={"rounded-card"}>

                                        <h2 className={"primary-text"}>Settings</h2>

                                        <Form.Group>
                                            <Button variant="outline-primary"
                                                    onClick={changeUserDetails}
                                                    style={{marginTop: "20px"}}
                                            >Edit account details
                                            </Button>
                                        </Form.Group>

                                        <Form.Group>
                                            <Button variant="outline-primary"
                                                    onClick={changePassword}
                                                    style={{marginTop: "20px"}}
                                            >
                                                Change Password
                                            </Button>
                                        </Form.Group>


                                    </Container>
                                </Tab.Pane>


                                <Tab.Pane eventKey={"connections"}>
                                    <Container className={"rounded-card"}>
                                        <h2 className={"primary-text"}>Account Connections
                                        </h2>
                                        <h2>
                                            {!connectedToSpotify ? (<Button
                                                    variant="default"
                                                    style={{
                                                        marginTop: "20px",
                                                        background: "#1ed760",
                                                        borderRadius: "20px",
                                                    }}
                                                    onClick={connectToSpotify}>
                                                    <Image
                                                        src={`${process.env.PUBLIC_URL}/assets/spotify.png`}
                                                        height={25}
                                                        style={{
                                                            paddingRight: "5px"
                                                        }}
                                                    />
                                                    Connect to Spotify!
                                                </Button>)
                                                : (<Button
                                                    variant="outline-danger"
                                                    style={{
                                                        marginTop: "20px",
                                                        borderRadius: "20px",
                                                    }}
                                                    onClick={connectToSpotify}>
                                                    <Image
                                                        src={`${process.env.PUBLIC_URL}/assets/spotify.png`}
                                                        height={25}
                                                        style={{
                                                            paddingRight: "5px"
                                                        }}
                                                    />
                                                    Disconnect from Spotify!

                                                </Button>)}

                                        </h2>


                                    </Container>
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                        <Col></Col>
                    </Row>
                </Tab.Container>
            </Container>

        </div>
    );
}

export default SettingsPage;