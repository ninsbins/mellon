import Header from "../components/Header";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import React, {useState} from "react";
import authService from "../services/authService";

const SignUpPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [email, setEmail] = useState("");

    const [validated, setValidated] = useState(false);
    const [errors, setErrors] = useState({});

    /* const handleSubmit = () => {
         //    send user creation to database
         console.log("handlesubmit-signup");
         authService.register(username, email, password)
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

    const formValidation = () => {
        const newErr = {};

        //username required
        if ( !username || username === '' ) newErr.username = 'Please enter a username!';

        //email required and valid email address
        if ( !email || email === '' ) newErr.email = 'Please enter an email!';
        else {
            const expression = /\S+@\S+/;
            let validEmail = expression.test(String(email).toLowerCase());
            if (!validEmail) newErr.email = 'Please enter a valid email';
        }
        console.log(repeatPassword)
        //password required, and repeat password must match
        if ( !password || password === '' ) newErr.password = 'Please enter a password!';
        if ( !repeatPassword || repeatPassword === '' ) newErr.repeatPassword = 'Please re-enter your password!';
        else {
            if ( password !== repeatPassword ) newErr.repeatPassword = "Your passwords don't match!";
        }

        return newErr;
    }

    const handleSubmit = (event) => {
        // const form = event.currentTarget;
        event.preventDefault();

        console.log('signup!')

        //front end validity checks
        const hasError = formValidation();
        console.log(hasError);

        if (Object.keys(hasError).length > 0 ) {
            setErrors(hasError);
        } else {
            console.log(username);
            setValidated(true);

            authService
                .register(username, email, password)
                .then(
                    response => {
                        console.log(response);
                        if (response.status==200) {
                            authService.login(username, password)
                                .then(() => {
                                    //history.push("/profile")
                                    window.location.replace(`http://localhost:3000/profile`);
                                });
                        }
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

    }


    return (
        <div>
            <Header/>
            <Container fluid className={"content-body"}>
                <Row className={"justify-content-center"}>
                    <Col/>
                    <Col sm={4}>
                        <Container className={"justify-content-center"} style={{
                            backgroundImage: `url(${process.env.PUBLIC_URL}/assets/container_blob.png)`,
                            height: "600px",
                            backgroundSize: "contain",
                            backgroundRepeat: "no-repeat"
                        }}>
                            <Row className={"justify-content-center"} style={{paddingTop: "80px", paddingLeft: "50px"}}>
                                <Form noValidate onSubmit={handleSubmit} validated={validated} style={{color: "white"}}>
                                    <Form.Group>
                                        <Col className={"justify-content-center"}>
                                            <Form.Group>
                                                {/*name*/}
                                                <Form.Label
                                                    controlId={"floatingInput"}
                                                    label={"Username"}
                                                >Username</Form.Label>
                                                <Form.Control
                                                    isInvalid={!! errors.username}
                                                    type={"text"}
                                                    placeholder={"Enter a username"}
                                                    onChange={(e) => (setUsername(e.target.value))}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.username}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group>
                                                {/*email*/}
                                                <Form.Label
                                                    controlId={"floatingInput"}
                                                    label={"Email"}
                                                >Email</Form.Label>
                                                <Form.Control
                                                    isInvalid={!! errors.email}
                                                    type={"email"}
                                                    placeholder={"Enter your Email"}
                                                    onChange={(e) => (setEmail(e.target.value))}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.email}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group>
                                                {/*password*/}
                                                <Form.Label
                                                    controlId={"floatingPassword"}
                                                    label={"Password"}
                                                >Password</Form.Label>
                                                <Form.Control
                                                    isInvalid={!! errors.password}
                                                    type={"password"}
                                                    placeholder={"Enter a password"}
                                                    onChange={(e) => (setPassword(e.target.value))}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.password}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label
                                                    controlId={"floatingPassword"}
                                                    label={"Re-enter Password"}
                                                >Re-enter Password</Form.Label>
                                                <Form.Control
                                                    isInvalid={!! errors.repeatPassword}
                                                    type={"password"}
                                                    placeholder={"Re-enter your password"}
                                                    onChange={(e) => (setRepeatPassword(e.target.value))}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.repeatPassword}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                    </Form.Group>
                                    <Row className={"justify-content-center"}>
                                        <Button type={"submit"}>Signup!</Button>
                                    </Row>
                                </Form>
                            </Row>

                        </Container>
                    </Col>
                    <Col sm={2} className={"align-content-center"}>
                        <div style={{paddingTop: "200px"}}>
                            <h2 className={"primary-text"}>Sign up now!</h2>
                            <p>Already a member? <Link to={'/login'}>Log in</Link></p>
                        </div>
                    </Col>
                    <Col/>


                </Row>
            </Container>
        </div>
    );
}

export default SignUpPage;