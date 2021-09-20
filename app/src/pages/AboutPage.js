import {Card, Col, Container, Row} from "react-bootstrap";
import Header from "../components/Header";

import "../styles/Home.css"
import {Component} from "react";

class AboutPage extends Component {
    render() {
        return (
            <div className={"content-body"}>
                <Header/>
                <Container fluid>
                    <Row>
                        <Col xs={6} md={4} className={"content-column"}>
                            <span className={"title"}>About us</span>
                        </Col>
                        <Col xs={12} md={8} className={"content-column"}>
                            <Container className={"rounded-card"}>
                                Mellon as this is the elvish name for ‘friend’. We believed this to be a simple
                                representation of the purpose of our site – to connect with others and make friends.
                                Mellon is all about connecting you with your friends and other people with similar
                                interests. Get recommendations, chat with friends, meeting people with the same
                                interests!
                            </Container>
                        </Col></Row>
                </Container>

            </div>
        );
    }
}

export default AboutPage;