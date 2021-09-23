import {Card, Col, Container, Row} from "react-bootstrap";
import Header from "../components/Header";

import "../styles/Home.css"
import "../styles/About.css"

const AboutPage = () => {
    return (
        <div className={"content-body"}>
            <Header/>
            <Container fluid className={"main-body"}>
                <Row xs={4}>
                    <Col className={"col-left"}>
                        <h2 className={"primary-text"}>About us</h2>
                    </Col>
                    <Col xs={8} className={"col-right"}>
                        <Container className={"rounded-card"}>
                            <p>Mellon as this is the elvish name for ‘friend’. We believed this to be a simple
                                representation of the purpose of our site – to connect with others and make friends.</p>

                            <p>Mellon is all about connecting you with your friends and other people with similar
                                interests. Get recommendations, chat with friends, meeting people with the same
                                interests!</p>
                        </Container>
                    </Col></Row>
            </Container>

        </div>
    );
}

export default AboutPage;