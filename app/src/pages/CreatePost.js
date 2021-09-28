import Header from "../components/Header";
import {Button, Col, Container, Form, Row} from "react-bootstrap";

const CreatePost = () => {
    return (
        <div>
            <Header/>
            <Container fluid className={"content-body"}>
                <Row className={"justify-content-center"}>
                    <Col>
                        <Row className={"justify-content-end"}>
                            <h2 className={"primary-text"}>Create a post</h2>
                        </Row>
                    </Col>
                    <Col sm={6}>
                        <Container className={"rounded-card"}>
                            <Form>
                                <Col>
                                    {/*<Form.Group>*/}
                                    {/*    <Form.Label>*/}
                                    {/*        Post type*/}
                                    {/*        <Form.Select>*/}
                                    {/*            <option>Post type</option>*/}
                                    {/*            <option value={"1"}>Spotify</option>*/}
                                    {/*        </Form.Select>*/}
                                    {/*    </Form.Label>*/}
                                    {/*</Form.Group>*/}
                                    <Form.Group>
                                        <Form.Label>
                                            Description
                                            <Form.Control
                                                type={"textarea"}
                                                placeholder={"Describe this post"}
                                                rows={3}
                                            />
                                        </Form.Label>
                                    </Form.Group>
                                    <Button>Post!</Button>
                                </Col>
                            </Form>
                        </Container>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        </div>
    )
}

export default CreatePost;
