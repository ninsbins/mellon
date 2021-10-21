import Header from "../components/Header";
import {Button, Col, Container, Form, FormControl, Image, Modal, Nav, Row, Tab} from "react-bootstrap";
//import './SpotifyButton.css'

import axiosConfig from "../services/axiosConfig";
import React, {useEffect, useState} from "react";
import authService from "../services/authService";
import {Link, useHistory} from "react-router-dom";
import axios from "axios";
import Player from "../components/Player";


const SettingsPage = () => {
    let history = useHistory();

    const [userID, setUserID] = useState("");
    const [connectedToSpotify, setConnectedToSpotify] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");


    // for user update
    const [newusername, setnewUsername] = useState("");
    const [newemail, setnewEmail] = useState("");
    const [newname, setnewName] = useState("");
    const [newbio, setnewBio] = useState("");

    // user username update requires password
    const [changeusername, setChangeusername] = useState(false);
    const [password, setPassword] = useState("");


    const [error, setError] = useState(null);
    const [show, setShow] = useState(false);



    useEffect(async () => {
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

        // TO DO: get user details
        await axiosConfig
            .get(`/user/getuser`)
            .then((response) => {
                console.log(response);
                setUsername(response.data.username)
                setEmail(response.data.email)
                setName(response.data.firstName);
                setBio(response.data.bio);
            })
    }, [name, username, email, bio])

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

    let handleClose = () => {
        setShow(false);
    }

    const changeUsername = async () => {
        setShow(true);
    }

    const handleClick = async () => {
        console.log(newusername);
        const updatelogin = newusername;
        console.log(username);
        await axiosConfig
            .post(`/user/changeusername?newUsername=${newusername}`)
            .then(response => {
                console.log(response);
                console.log(updatelogin);
                authService.logout();
                authService.login(updatelogin, password)
                    .then(response => {
                        console.log(response)
                        window.location.replace('http://localhost:3000/profile')
                    }).catch((err) => {
                    console.log(err);
            });
            }).catch((err) => {
                console.log(err);
        });
    }


    const changeEmail =  async () => {
        await axiosConfig
            .post(`/user/changeemail?newEmail=${newemail}`)
            .then(response => {
                console.log(response);
                localStorage.removeItem("user");
                localStorage.setItem("user", JSON.stringify(response.data));
            }).catch((err) => {
                console.log(err);
            })
    }

    const changeName = async () => {
        await axiosConfig
            .post(`/user/changename?newName=${newname}`)
            .then(response => {
                console.log(response);
                localStorage.removeItem("user");
                localStorage.setItem("user", JSON.stringify(response.data));
            }).catch((err) => {
                console.log(err);
                setError(err);
            })
    }

    const changeBio = async () => {
        console.log(newbio);
        await axiosConfig
            .post(`/user/changebio?newBio=${newbio}`)
            .then(response => {
                console.log(response);
                localStorage.removeItem("user");
                localStorage.setItem("user", JSON.stringify(response.data));
            }).catch((err) => {
                console.log(err);
                setError(err);
            })
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
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                             style={{marginRight: "15px"}}
                                             fill="currentColor" className="bi bi-gear" viewBox="0 0 16 16">
                                            <path
                                                d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                                            <path
                                                d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                                        </svg>
                                        Settings
                                    </Nav.Link>
                                </Nav.Item>

                                <Nav.Item>
                                    <Nav.Link eventKey={"generalsettings"}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                             style={{marginRight: "15px"}}
                                             fill="currentColor" className="bi bi-gear" viewBox="0 0 16 16">
                                            <path
                                                d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                                            <path
                                                d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                                        </svg>
                                        General Settings
                                    </Nav.Link>
                                </Nav.Item>

                                <Nav.Item>
                                    <Nav.Link eventKey={"connections"}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                             style={{marginRight: "15px"}}
                                             fill="currentColor" className="bi bi-person-plus-fill" viewBox="0 0 16 16">
                                            <path
                                                d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                            <path fill-rule="evenodd"
                                                  d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                                        </svg>
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
                                            >Change Password
                                            </Button>
                                        </Form.Group>


                                    </Container>
                                </Tab.Pane>

                                <Tab.Pane eventKey={"generalsettings"}>
                                    <Container className={"rounded-card"}>

                                        <Row className={"justify-content-center"}>
                                            <h2 className={"primary-text"}>General Profile Settings</h2>
                                        </Row>

                                        <h2 className={"settings-text"}> Username </h2>

                                        <Row className={"justify-content-center"}>
                                            <div className="input-group mb-3" style={{
                                                display:"flex",
                                                width:"90%",
                                                justifyContent:'center',
                                                borderRadius:'20px',
                                                align:'center'
                                            }}>
                                                <FormControl
                                                    //isInvalid={!! error}
                                                    onChange={(e) => setnewUsername(e.target.value)}
                                                    value={newusername}
                                                    placeholder={username}/>
                                                <div className="input-group-append">
                                                    <button className="btn btn-outline-secondary"
                                                            type="button"
                                                            onClick={changeUsername}
                                                    >Edit</button>
                                                </div>
                                            </div>
                                        </Row>

                                        <h2 className={"settings-text"}> Email </h2>

                                        <Row className={"justify-content-center"}>
                                            <div className="input-group mb-3" style={{
                                                display:"flex",
                                                width:"90%",
                                                justifyContent:'center',
                                                borderRadius:'20px',
                                                align:'center'
                                            }}>
                                                <FormControl
                                                    //isInvalid={!! error}
                                                    onChange={(e) => setnewEmail(e.target.value)}
                                                    value={newemail}
                                                    placeholder={email}/>
                                                <div className="input-group-append">
                                                    <button className="btn btn-outline-secondary"
                                                            type="button"
                                                            onClick={changeEmail}
                                                    >Edit</button>
                                                </div>

                                            </div>
                                        </Row>

                                        <h2 className={"settings-text"}> Name </h2>

                                        <Row className={"justify-content-center"}>
                                            <div className="input-group mb-3" style={{
                                                display:"flex",
                                                width:"90%",
                                                justifyContent:'center',
                                                borderRadius:'20px',
                                                align:'center'
                                            }}>
                                                <FormControl
                                                    onChange={(e) => setnewName(e.target.value)}
                                                    value={newname}
                                                    placeholder={name}/>
                                                <div className="input-group-append">
                                                    <button className="btn btn-outline-secondary"
                                                            type="button"
                                                            onClick={changeName}
                                                    >Edit</button>
                                                </div>
                                            </div>
                                        </Row>

                                        <h2 className={"settings-text"}> Bio </h2>

                                        <Row className={"justify-content-center"}>
                                            <div className="input-group mb-3" style={{
                                                display:"flex",
                                                width:"90%",
                                                justifyContent:'center',
                                                borderRadius:'20px',
                                                align:'center'
                                            }}>
                                                <FormControl
                                                    as={"textarea"}
                                                    rows={3}
                                                    onChange={(e) => setnewBio(e.target.value)}
                                                    value={newbio}
                                                    placeholder={bio}/>
                                                <div className="input-group-append">
                                                    <button className="btn btn-outline-secondary"
                                                            type="button"
                                                            onClick={changeBio}
                                                    >Edit</button>
                                                </div>
                                            </div>
                                        </Row>

                                    </Container>
                                </Tab.Pane>


                                <Tab.Pane eventKey={"connections"}>
                                    <Container className={"rounded-card"}>
                                        <Row className={"justify-content-center"}>
                                            <h2 className={"primary-text"}>Account Connections</h2>
                                        </Row>
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

            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                        <div className={"profile-header"}>
                            <Row className={"justify-content-center"}>
                                <h2 className={"primary-text"}>Security Confirmation</h2>
                            </Row>

                            <Row className={"justify-content-center"}>
                                <div className="input-group mb-3" style={{
                                    display:"flex",
                                    width:"90%",
                                    justifyContent:'center',
                                    borderRadius:'20px',
                                    align:'center'
                                }}>
                                    <FormControl
                                        //isInvalid={!! error}
                                        type={"password"}
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
                                        placeholder={"Enter password to continue."}/>
                                </div>

                                <Button style={{
                                    marginTop: "20px",
                                    background: "#471a66",
                                    borderColor: "white",
                                    borderRadius: "20px",
                                }}
                                        onClick={handleClick}>
                                    Join Mellon!
                                </Button>

                            </Row>
                        </div>

                </Modal.Body>
            </Modal>

        </div>
    );
}

export default SettingsPage;