import Header from "../components/Header";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {Component} from "react";

class SignUpPage extends Component {
    render() {
        return (
            <div className={"content-body"}>
                <Header/>

                <Container fluid>
                    <Row>
                        <Col>
                            <Container className={"rounded-card"}>
                                <Button>Sign up</Button>
                            </Container>
                        </Col>
                        <Col>
                            <span className={"title"}>Sign up now!</span>
                        </Col>
                    </Row>
                </Container>

            </div>
        );
    }
}

export default SignUpPage;