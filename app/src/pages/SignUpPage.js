import Header from "../components/Header";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useState} from "react";
import AuthService from "../services/authservice";

import axios from "axios";

const SignUpPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");


    /* const handleSubmit = () => {
         //    send user creation to database
         console.log("handlesubmit-signup");
         AuthService.register(username, email, password)
             .then(
                 response => {
                     console.log(response);
                 },
                 error => {
                     const resMessage =
                         (error.response &&
                             error.response.data &&
                             error.response.data.message) ||
                         error.message ||
                         error.toString();

                     console.log(resMessage);
                 }
             );
     }*/

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(username);
        AuthService
            .register(username, email, password)
            .then(
                response => {
                    console.log(response);
                    // this line is what i'm trying to fix
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
                }
            );

    }


    return (
        <div>
            <Header/>
            <Container fluid className={"content-body"}>
                <Row className={"justify-content-center"}>
                    <Col></Col>
                    <Col sm={2}>
                        <Container className={"justify-content-center rounded-card"}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Col className={"justify-content-md-center"}>
                                        <Row>
                                            {/*name*/}
                                            <Form.Label
                                                controlId={"floatingInput"}
                                                label={"Name"}
                                            >Name <Form.Control
                                                type={"text"}
                                                placeholder={"Enter your name"}
                                                onChange={(e) => (setUsername(e.target.value))}
                                            /></Form.Label>
                                        </Row>
                                        <Row>
                                            {/*email*/}
                                            <Form.Label
                                                controlId={"floatingInput"}
                                                label={"Email"}
                                            >Email <Form.Control
                                                type={"email"}
                                                placeholder={"Enter your Email"}
                                                onChange={(e) => (setEmail(e.target.value))}
                                            /></Form.Label>
                                        </Row>
                                        <Row>
                                            {/*password*/}
                                            <Form.Label
                                                controlId={"floatingPassword"}
                                                label={"Password"}
                                            >Password <Form.Control
                                                type={"password"}
                                                placeholder={"Enter a password"}
                                                onChange={(e) => (setPassword(e.target.value))}
                                            /></Form.Label>
                                        </Row>
                                        <Row>
                                            <Form.Label
                                                controlId={"floatingPassword"}
                                                label={"Re-enter Password"}
                                            >Re-enter Password <Form.Control
                                                type={"password"}
                                                placeholder={"Re-enter your password"}
                                            /></Form.Label>
                                        </Row>
                                    </Col>
                                </Form.Group>
                                <Button
                                    type={"submit"}
                                    onClick={
                                        console.log("signup")
                                    }
                                >Signup</Button>
                            </Form>
                        </Container>
                    </Col>
                    <Col sm={4}>
                        <Row className={"justify-content-center"}>
                            <Col></Col>
                            <Col className={"align-content-center"}>
                                <h2 className={"primary-text"}>Sign up now!</h2>
                                <p>Already a member? <Link to={'/login'}>Log in</Link></p>
                            </Col>
                            <Col></Col>
                        </Row>

                    </Col>
                    <Col></Col>


                </Row>
            </Container>
        </div>
    );
}

export default SignUpPage;