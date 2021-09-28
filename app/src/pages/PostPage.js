import Header from "../components/Header";
import {Button, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

const PostPage = () => {
    // these are posts made by users that are stored on our database

    return (
        <div>
            <Header/>
            <Container fluid className={"content-body"}>
                <Row className={"justify-content-center"}>
                    <Col>
                        <Row className={"justify-content-end"}>
                            <h2 className={"primary-text"}>Test post</h2>
                        </Row>
                    </Col>
                    <Col sm={6}>
                        <Container className={"rounded-card"}>
                            <Col>
                                <Container>
                                    image <br/>
                                    Post description
                                </Container>
                            </Col>

                        </Container>
                    </Col>
                    <Col></Col>
                </Row>

            </Container>
        </div>
    )
}

export default PostPage;