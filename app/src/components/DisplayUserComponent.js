import Header from "../components/Header";
import {Badge, Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {useHistory, useLocation} from "react-router-dom";
import axios from "axios";
import UserServiceTesting from "../services/UserServiceTesting";
import authHeader from "../services/authHeader";
import Moria from "../DoorsOfMoria.png";
import axiosConfig from "../services/axiosConfig";

//When the user clicks on the hyperlink/title of Post in Feed
const DisplayUserComponent = () => {

    let location = useLocation();
    let history = useHistory();
    const [username, setUserName] = useState("");
    const [allUserDetails, setUserDetails] = useState(null); //store the User api json response
    const [posts, setPosts] = useState(null); //store all the User's posts :)

    useEffect(() => {
        const url = window.location.pathname; //get the path(minus domain name)
        //console.log(url);
        const username = url.split("/").pop();
        console.log("USERNAME: " + username); // e.g., "ronald"
        setUserName(username); //set the state variable

        //Get all Posts!!
        //getAllPosts();
        //axiosConfig.get(`post/all-user-posts/{username}`)
        //need to make a post array


        //Option 1: Fetch user details via Service class
        /*
        UserServiceTesting.getUserByUserName(username).then((response) => {
                setUserDetails(response.data); //set User object into state variable
                console.log("checking for stored data: " + response.data.email);
            })

         */

        //Option 2: Using axios
        axios.get(`http://localhost:8080/update/user/${username}`, {headers: authHeader()}).then((response) => {
            console.log("checking line 43.");
            setUserDetails(response.data); //set State variable
        }).catch(err => console.log(err));

    }, [location])

    function getAllPosts() {
        console.log("geting all posts of User: " + username);

    }


    //Display the User details
    return (
        <div>
            <Header/>
            <Container fluid className={"content-body"}>
                <Row className={"justify-content-center"}>
                    <Col>
                        <Row className={"justify-content-end"}>
                            <h2 className={"primary-text"}> User Profile</h2>
                        </Row>
                    </Col>

                    <Col xs={3}>
                        <Container className={"rounded-card"}>
                            <Col>
                                <Row class={"justify-content-space-between"}>
                                    <Col>
                                        <strong>User name</strong>
                                    </Col>
                                    <Col>
                                        {username}
                                    </Col>
                                </Row>

                                <Row class={"justify-content-space-between"}>
                                    <Col>
                                        <strong>First name</strong>
                                    </Col>
                                    <Col>
                                        {allUserDetails === null ? '' :  allUserDetails.firstName}
                                    </Col>
                                </Row>

                                <Row class={"justify-content-space-between"}>
                                    <Col>
                                        <strong>Last name</strong>
                                    </Col>
                                    <Col>
                                        {allUserDetails === null ? '' :  allUserDetails.lastName}
                                    </Col>
                                </Row>

                                <Row class={"justify-content-space-between"}>
                                    <Col>
                                        <strong>Email</strong>
                                    </Col>
                                    <Col>
                                        {allUserDetails === null ? '' :  allUserDetails.email}
                                    </Col>
                                </Row>
                                <p> </p>

                                <p><strong> Bio </strong></p>
                                <p>
                                    {allUserDetails === null ? '' :  allUserDetails.bio}
                                </p>
                            </Col>
                        </Container>
                    </Col>
                    <Col/>
                </Row>
            </Container>


            <Container fluid className={"content-body"}>
                <Row className={"justify-content-center"}>

                    <h2 className={"primary-text"}> Recent Posts </h2>


                    <Col xs={6}>
                        <Container className={"rounded-card"}>
                            <Col>
                                <Row class={"justify-content-space-between"}>
                                    <Col>
                                        <strong> All Categories </strong>
                                    </Col>
                                    <Col>
                                        {username}
                                    </Col>
                                </Row>
                            </Col>
                        </Container>
                    </Col>
                </Row>
            </Container>


        </div>
    );
}

export default DisplayUserComponent;