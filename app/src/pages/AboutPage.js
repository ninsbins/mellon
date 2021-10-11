import {Card, Col, Container, Row} from "react-bootstrap";
import Header from "../components/Header";

import "../styles/About.css"

const AboutPage = () => {
    return (
        <div>
            <Header/>
            <Container fluid className={"content-body"}>
                <Row className={"justify-content-center"}>
                    <Col>
                        <Row className={"justify-content-end"}>
                            <h2 className={"primary-text"}>About us</h2>
                        </Row>
                    </Col>
                    <Col xs={5}>
                        <Container className={"rounded-card"}>
                            <p>Mellon is the elvish name for ‘friend’, from the movie series Lord of the Rings.
                                We believed this to be a simple representation of the purpose of our site –
                                to connect with others and make friends. </p>

                            <p>With the ever-growing nature of content on the internet, it can be hard to keep up to date, find new things
                                to watch, read, or do. Mellon is an inclusive online platform that allows you to stay
                                connected, collaborate, and contribute with your friends. Mellon helps you keep track
                                of your favourite things, seeing what your friends are interested in, and
                                find people that share similar favourites.</p>

                            <p>Explore new content, share recommendations with your friends, and build a community! </p>

                        </Container>
                    </Col>
                    <Col/>
                </Row>
            </Container>

        </div>
    );
}

export default AboutPage;