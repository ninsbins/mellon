import Header from "../components/Header";
import {Col, Container, Row} from "react-bootstrap";

const CreatePost = () => {
    return (
        <div>
            <Header/>
            <Container fluid className={"content-body"}>
                <Row>
                    <Col>
                        <h2 className={"primary-text"}>Create a post</h2>
                    </Col>
                    <Col xs={8}>

                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default CreatePost;
