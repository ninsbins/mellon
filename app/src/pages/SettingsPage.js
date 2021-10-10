import Header from "../components/Header";
import {Button, Col, Container, Form, Image, Nav, Row, Tab} from "react-bootstrap";
//import './SpotifyButton.css'

import axiosConfig from "../services/axiosConfig";
import {useState} from "react";
import authService from "../services/authService";
import {useHistory} from "react-router-dom";


const SettingsPage = () => {
    let history = useHistory();

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
                                        Email

                                        Change email
                                        <Form>
                                            <Form.Group>
                                                <Form.Label>

                                                </Form.Label>
                                            </Form.Group>
                                        </Form>

                                        Change password
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