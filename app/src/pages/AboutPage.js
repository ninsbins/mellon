import {Card, Col, Container, Row} from "react-bootstrap";
import Header from "../components/Header";

import "../styles/About.css"

const AboutPage = () => {
    return (
        <div>
            <Header/>
            <Container fluid className={"content-body"}>
                <Row xs={4}>
                    <Col className={"col-left"}>
                        <h2 className={"primary-text"}>About us</h2>
                    </Col>
                    <Col xs={8} className={"col-right"}>
                        <Container className={"rounded-card"}>
                            <span>Mellon as this is the elvish name for ‘friend’. We believed this to be a simple
                                representation of the purpose of our site – to connect with others and make friends.</span>
                            <br />
                            <span>Mellon is all about connecting you with your friends and other people with similar
                                interests. Get recommendations, chat with friends, meeting people with the same
                                interests!</span>
                        </Container>
                    </Col></Row>
            </Container>

        </div>
    );
}

export default AboutPage;