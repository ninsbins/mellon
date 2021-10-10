import Header from "../components/Header";
import {Button, Col, Container, Form, Nav, Row, Tab} from "react-bootstrap";
//import './SpotifyButton.css'

import SpotifyButton from "../components/SpotifyButton";
import axiosConfig from "../services/axiosConfig";
import {useState} from "react";


const SettingsPage = () => {
    const [spotifyToken, setSpotifyToken] = useState(null);

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

                        </Col>
                        <Col sm={6}>
                            <Tab.Content>
                                <Tab.Pane eventKey={"settings"}>
                                    <Container className={"rounded-card"}>
                                        <h2 className={"primary-text"}>Settings</h2>
                                        Change password!
                                        <Form>
                                            <Form.Group>
                                                <Form.Label>

                                                </Form.Label>
                                            </Form.Group>
                                        </Form>

                                        <Form>
                                            <Form.Group>
                                                <Form.Label>Old Password</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    // onChange={(e) => setOldPassword(e.target.value)}
                                                />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label>New Password</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    // onChange={(e) => setNewPassword1(e.target.value)}
                                                />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label>Re-enter New Password</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    // onChange={(e) => setNewPassword2(e.target.value)}
                                                />
                                            </Form.Group>
                                            <Form.Group>
                                                <Button variant="outline-primary" type="submit">
                                                    Change Password
                                                </Button>
                                            </Form.Group>
                                            {/*handle errors*/}
                                            {/*{error ? (*/}
                                            {/*    <div style={{ color: "red" }}>*/}
                                            {/*        Error: Couldn&#39;t change password*/}
                                            {/*    </div>*/}
                                            {/*) : null}*/}
                                            {/*{nonMatching ? (*/}
                                            {/*    <div style={{ color: "red" }}>Passwords don&#39;t match</div>*/}
                                            {/*) : null}*/}
                                            {/*{success ? (*/}
                                            {/*    <div style={{ color: "green" }}>Changed Password</div>*/}
                                            {/*) : null}*/}
                                        </Form>
                                    </Container>
                                </Tab.Pane>
                                <Tab.Pane eventKey={"connections"}>
                                    <Container className={"rounded-card"}>
                                        <h2 className={"primary-text"}>Account Connections
                                        </h2>
                                        <h2>
                                            <Button
                                                variant="default"
                                                style={{background: "#1ed760",
                                                        borderTopLeftRadius: "20px",
                                                        borderTopRightRadius: "20px",
                                                        borderBottomRightRadius: "20px",
                                                        borderBottomLeftRadius: "20px"}}
                                                onClick={connectToSpotify}>
                                                Connect to Spotify!

                                                </Button>
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