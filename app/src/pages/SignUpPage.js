import Header from "../components/Header";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

const SignUpPage = () => {

    const handleSubmit = () => {
        //    send user creation to database
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
                                >Login</Button>
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