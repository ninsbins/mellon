import Header from "../components/Header";
import {Col, Container, Row} from "react-bootstrap";
import { Link, useParams, useHistory } from "react-router-dom";
import {useEffect, useState} from "react";

const PostPage = () => {
    // these are posts made by users that are stored on our database

    const { id } = useParams();

    const [postInfo, setPostInfo] = useState("");

    useEffect(() => {
        //get post with id from backend

    })

    return (
        <div>
            <Header/>
            <Container fluid className={"content-body"}>
                <Row className={"justify-content-center"}>
                    <Col>
                        <Row className={"justify-content-end"}>
                            <h2 className={"primary-text"}>post title</h2>
                        </Row>
                    </Col>
                    <Col sm={6}>
                        <Container className={"rounded-card"}>
                            <Col>
                                <Container>
                                    post id {id}
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