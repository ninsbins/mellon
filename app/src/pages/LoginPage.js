import {Link} from "react-router-dom";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import Header from "../components/Header";
import React, {Component, useState} from "react";

import AuthService from "../services/auth.service";
import axios from "axios";


const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = () => {
        console.log(username);
        axios.post(`http://localhost:8080/api/auth/login/`, {username,password});
    }

    return (
        <div>
            <Header/>
            <Container fluid className={"content-body"}>
                <Row className={"justify-content-center"}>
                    <Col></Col>
                    <Col sm={2}>
                        <Container className={"blob"}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Col>
                                    {/*email*/}
                                    <Form.Label
                                        controlId={"floatingInput"}
                                        label={"Email"}
                                    > Email<Form.Control
                                        type={"input"}
                                        placeholder={"Enter your email"}
                                        onChange={(e) => setUsername(e.target.value)}
                                    /></Form.Label>

                                    {/*password*/}
                                    <Form.Label
                                        controlId={"floatingPassword"}
                                        label={"Password"}
                                    > Password <Form.Control
                                        type={"password"}
                                        placeholder={"Password"}
                                        onChange={(e) => (setPassword(e.target.value))}
                                    /></Form.Label>
                                    </Col>
                                </Form.Group>
                                <Button
                                    type={"submit"}
                                    onClick={
                                        () => {
                                            console.log("login")
                                            console.log(username)
                                        }
                                    }
                                >Login</Button>
                            </Form>
                        </Container>
                    </Col>
                    <Col sm={4}>
                        <Row className={"justify-content-center"}>
                            <Col></Col>
                            <Col>
                                <h2 className={"primary-text"}>Log in to Mellon</h2>
                                <p>Not a member? <Link to={'/signup'}>Sign up now</Link></p>
                            </Col>
                            <Col></Col>
                        </Row>

                    </Col>
                    <Col></Col>


                </Row>
            </Container>
        </div>
    )
}

export default LoginPage;