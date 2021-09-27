import {Link} from "react-router-dom";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import Header from "../components/Header";

const LoginPage = () => {
    return (
        <div className={"content-body"}>
            <Header/>
            <Row>
                <Col>
                    <Container fluid className={"rounded-card"}>
                        <Form>
                            <Form.Group>
                                <Col>
                                    {/*email*/}
                                    <Form.Label
                                    controlId={"floatingInput"}
                                    label={"Email"}
                                    > Email<Form.Control
                                        type={"email"}
                                        placeholder={"Enter your email"}
                                    /></Form.Label>

                                    {/*password*/}
                                    <Form.Label
                                        controlId={"floatingPassword"}
                                        label={"Password"}
                                    > Password <Form.Control
                                        type={"password"}
                                        placeholder={"Password"}
                                    /></Form.Label>
                                </Col>
                            </Form.Group>
                            <Button
                                onClick={
                                    console.log("login")
                                }
                            >Log in</Button>
                        </Form>
                    </Container>
                </Col>
                <Col>
                    <h2 className={"primary-text"}>Log in to Mellon</h2>
                    <p>Not a member? <Link to={'/signup'}>Sign up now</Link></p>
                </Col>

            </Row>
        </div>
    )
}

export default LoginPage;