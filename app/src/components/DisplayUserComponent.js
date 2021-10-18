import Header from "../components/Header";
import {Badge, Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {useHistory, useLocation} from "react-router-dom";
import axios from "axios";
import UserServiceTesting from "../services/UserServiceTesting";
import authHeader from "../services/authHeader";

//When the user clicks on the hyperlink/title of Post in Feed
const DisplayUserComponent = () => {

    let location = useLocation();
    let history = useHistory();
    const [username, setUserName] = useState("");
    const [allUserDetails, setUserDetails] = useState(null); //store the api json response

    useEffect(() => {
        const url = window.location.pathname; //get the path(minus domain name)
        console.log(url);
        const username = url.split("/").pop();
        console.log("USERNAME: " + username); // "ronald"
        setUserName(username); //set the state variable

        /*
        //Fetch user details and store
        UserServiceTesting.getUserByUserName(username).then((response)=>{
                setUserDetails(response.data); //set User object into state variable
                console.log("checking for stored data: " + allUserDetails.bio);
                console.log("checking for stored data: " + allUserDetails.email);
                //console.log("checking the state variable has beeen state: " + moreMovieInfo.Plot) this will cause issue
            })

         */


        axios.get(`http://localhost:8080/update/user/${username}`, {headers: authHeader()}).then((response) => {
            console.log("checking line 43.");
            setUserDetails(response.data); //set State variable
        }).catch(err => console.log(err));

    }, [location])


    //Display the User details
    return (
        <div>
            <Header/>
            <Container fluid className={"content-body"}>
                <Row className={"justify-content-center"}>
                    <Col sm={6}>
                        <Container className={"rounded-card"}>
                            <Col>
                                <h2 className={"primary-text"}> User Profile </h2>
                                {/*  empty line below  */}
                                <div className="col-md-3 col-sm-3 col-xs-3">&nbsp;</div>

                                <Row className={"justify-content-center"}>

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
                                </Row>
                            </Col>

                        </Container>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        </div>
    )
}

export default DisplayUserComponent;