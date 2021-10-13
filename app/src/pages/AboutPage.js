import {Card, Col, Container, Row} from "react-bootstrap";
import Header from "../components/Header";

import "../styles/About.css"
import Moria from "../DoorsOfMoria.png";
import React from "react";

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
                            <p><em>Mellon</em> is the elvish name for ‘friend’, from J. R. R. Tolkien's novel The Lord of the Rings.
                                We believed this to be a simple representation of the purpose of our site –
                                to connect with others and make friends. </p>

                            <p>With the ever-growing nature of content on the internet, it can be hard to keep up to date, find new things
                                to watch, read, or do. Mellon is an inclusive online platform that allows you to stay
                                connected, collaborate, and contribute with your friends. Mellon helps you keep track
                                of your favourite things, seeing what your friends are interested in, and
                                find people that share similar favourites.</p>

                            <p>Explore new content, share recommendations with your friends, and build a community! </p>

                            <div className="col-md-3 col-sm-3 col-xs-3">&nbsp;</div>
                            {/*  insert centered image */}
                            <div className="moria">
                                <img src={Moria} alt="Moria" height={150} width={120} />
                            </div>

                        </Container>
                    </Col>
                    <Col/>
                </Row>
            </Container>

        </div>
    );
}

export default AboutPage;