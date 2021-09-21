import Header from "../components/Header";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

const SignUpPage = () => {
    return (
        <div className={"content-body"}>
            <Header/>

            <Container fluid>
                <Row>
                    <Col>
                        <Container className={"rounded-card"}>
                            <Form>
                                <Form.Group>

                                </Form.Group>
                            </Form>

                        </Container>
                    </Col>
                    <Col>
                        <h2 className={"primary-text"}>Sign up now!</h2>
                        <p>Already a member? <Link to={'/login'}>Log in</Link></p>
                    </Col>
                </Row>
            </Container>

        </div>
    );
}

export default SignUpPage;