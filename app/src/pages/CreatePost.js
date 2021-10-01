import Header from "../components/Header";
import {Button, Col, Container, Form, Image, Row} from "react-bootstrap";
import {useLocation} from "react-router-dom";
import {useEffect} from "react";

const CreatePost = () => {

    let location = useLocation();

    //post info
    let type = location.state.type
    let title = location.state.title;
    let image = location.state.image;

    useEffect(() => {
        console.log(location.state.title)
    }, [location]);

    const handleSubmit = async () => {
        //    send post to database
    }

    return (
        <div>
            <Header/>
            <Container fluid className={"content-body"}>
                <Row className={"justify-content-center"}>
                    <Col>
                        <Row className={"justify-content-end"}>
                            <h2 className={"primary-text"}>Create a recommendation</h2>
                        </Row>
                    </Col>
                    <Col sm={6}>
                        <Container className={"rounded-card"}>
                            <Image src={image}/>
                            <Form onSubmit={handleSubmit}>
                                <Col>
                                    {/*prefilled post content*/}
                                    <fieldset disabled>
                                        <Form.Group>
                                            <Form.Label>Item type</Form.Label>
                                            <Form.Control as={"select"} id={"disabledSelect"}>
                                                <option>{type}</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>
                                                Item title
                                            </Form.Label>
                                            <Form.Control id={"disabledTextInput"} placeholder={title}/>
                                        </Form.Group>
                                    </fieldset>

                                    {/*user to write recommendation/review/comment*/}
                                    <Form.Group>
                                        <Form.Label>
                                            Comments
                                        </Form.Label>
                                        <Form.Control
                                            as={"textarea"}
                                            placeholder={"What do you want to share?"}
                                            rows={4}
                                        />
                                    </Form.Group>
                                    <Button type={"submit"}>Post!</Button>
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
