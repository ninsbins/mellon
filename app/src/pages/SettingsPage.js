import Header from "../components/Header";
import {Button, Col, Container, Form, Image, Nav, Row, Tab} from "react-bootstrap";
//import './SpotifyButton.css'

import axiosConfig from "../services/axiosConfig";
import React, {useEffect, useState} from "react";
import authService from "../services/authService";
import {useHistory} from "react-router-dom";
import axios from "axios";


const SettingsPage = () => {
    let history = useHistory();

    const [spotifyToken, setSpotifyToken] = useState(null);
    const [userID, setUserID] = useState("");

    useEffect(() => {
        const jsObject = authService.getCurrentUser();
        //console.log("getting user details: " + JSON.stringify(jsObject));
        //console.log("ID of current logged in User: " + jsObject.id);
        setUserID(jsObject.id);
        console.log("Double checking User's ID: " + userID);
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

    const setToken = async () => {
        axiosConfig
            .get(`/spotify/get-token`)
            .then(response => {
                console.log(response.data);
                setSpotifyToken(response.data);

            })
    }


    const connectToSpotify = async () => {
        //do something
        axiosConfig
            .get(`/spotify/login`)
            .then(response => {
                console.log(response);
                window.location.replace(response.data);
            });

        setToken();

    }

    const handleLogout = async() => {
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
                            <Button onClick={handleLogout}>
                                Logout
                            </Button>
                        </Col>
                        <Col sm={6}>
                            <Tab.Content>

                                <Tab.Pane eventKey={"settings"}>
                                    <Container className={"rounded-card"}>

                                        <h2 className={"primary-text"}>Settings</h2>

                                            {/*  empty space before buttons */}
                                            <div className="col-md-3 col-sm-3 col-xs-3">&nbsp;</div>
                                            Change password!

                                            <Form.Group>
                                                <Button variant="outline-primary" onClick={changePassword}>
                                                    Change Password
                                                </Button>
                                            </Form.Group>

                                            {/*  empty space before buttons */}
                                            <div className="col-md-3 col-sm-3 col-xs-3">&nbsp;</div>

                                            Edit your other details!
                                            <Form.Group>
                                                <Button variant="outline-primary" onClick={changeUserDetails} >Edit User Details</Button>{' '}
                                            </Form.Group>

                                    </Container>
                                </Tab.Pane>


                                <Tab.Pane eventKey={"connections"}>
                                    <Container className={"rounded-card"}>
                                        <h2 className={"primary-text"}>Account Connections
                                        </h2>
                                        <h2>
                                            {spotifyToken ?  (<Button
                                                    variant="default"
                                                    style={{background: "#1ed760",
                                                        borderTopLeftRadius: "20px",
                                                        borderTopRightRadius: "20px",
                                                        borderBottomRightRadius: "20px",
                                                        borderBottomLeftRadius: "20px"}}
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
                                                :(<Button
                                                    variant="outline-danger"
                                                    style={{
                                                        borderTopLeftRadius: "20px",
                                                        borderTopRightRadius: "20px",
                                                        borderBottomRightRadius: "20px",
                                                        borderBottomLeftRadius: "20px"}}
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