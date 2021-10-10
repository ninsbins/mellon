import {Link} from "react-router-dom";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import Header from "../components/Header";
import React, {useState} from "react";
import authService from "../services/authService";


const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(username);
        authService
            .login(username, password)
            .then(() => {
                    //history.push("/profile")
                    window.location.replace(`http://localhost:3000/profile`);
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    console.log(resMessage);

                });


    }

    return (
        <div>
            <Header/>
            <Container fluid className={"content-body"}>
                <Row className={"justify-content-center"}>
                    <Col/>
                    <Col sm={4}>
                        <Container className={"align-content-center"} style={{
                            backgroundImage: `url(${process.env.PUBLIC_URL}/assets/container_blob.png)`,
                            height: "600px",
                            backgroundSize: "contain",
                            backgroundRepeat: "no-repeat"
                        }}>
                            <Row className={"justify-content-center"} style={{paddingTop: "200px", paddingLeft: "40px"}}>
                                <Form onSubmit={handleSubmit} style={{color: "white"}}>
                                    <Col>
                                        <Form.Group>
                                            {/*email*/}
                                            <Form.Label
                                                controlId={"floatingInput"}
                                                label={"Email"}
                                            > Username</Form.Label>
                                            <Form.Control
                                                type={"input"}
                                                placeholder={"Enter your username"}
                                                onChange={(e) => setUsername(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            {/*password*/}
                                            <Form.Label
                                                controlId={"floatingPassword"}
                                                label={"Password"}
                                            > Password</Form.Label>
                                            <Form.Control
                                                type={"password"}
                                                placeholder={"Password"}
                                                onChange={(e) => (setPassword(e.target.value))}
                                            />
                                        </Form.Group>
                                        <Row className={"justify-content-center"}>
                                            <Button type={"submit"}>Login</Button>
                                        </Row>

                                    </Col>
                                </Form>
                            </Row>
                        </Container>
                    </Col>
                    <Col sm={2} style={{marginTop: "200px"}}>
                        <h2 className={"primary-text"}>Log in to Mellon</h2>
                        <p>Not a member? <Link to={'/signup'}>Sign up now</Link></p>
                    </Col>
                    <Col/>


                </Row>
            </Container>
        </div>
    )
}

export default LoginPage;