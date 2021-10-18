import Header from "../components/Header";
import {Button, Col, Container, Form, Image, Row} from "react-bootstrap";
import {useHistory, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosConfig from "../services/axiosConfig";
import authService from "../services/authService";

const CreatePost = () => {

    let location = useLocation();
    let history = useHistory();

    //post info
    let username = authService.getCurrentUser().username;
    let date = (new Date()).toJSON();
    let type = location.state.type
    let title = location.state.title;
    let image = location.state.image;

    //post validation
    const [errors, setErrors] = useState({});

    let [content, setContent] = useState("");

    useEffect(() => {
        console.log(location.state.type)
        console.log(date);
        // console.log(JSON.parse(date));
    }, [location]);

    const formValidation = () => {
        const newErr= {};

        //null check for error
        if (!content || content === '') newErr.content = 'Add a comment to your post!';

        return newErr;
    };

    const handleSubmit = async (event) => {
        //    send post to database
        event.preventDefault();

        const hasError = formValidation();
        console.log(hasError);
        console.log(content);

        if (Object.keys(hasError).length > 0) {
            setErrors(hasError)
        } else {
            // let postData = JSON.parse('{
            //     "content": content,
            //     "createdDate": ${date},
            //     "imageUrl": ${image},
            //     "itemType": {type},
            //     "itemTitle": {title},
            // }');
            //
            console.log(date)

            await axiosConfig.post(`/post/addpost`, {
                content: content,
                createdDate: date,
                imageUrl: image,
                itemType: type,
                itemTitle: title
            })
                .then((res) => {
                    console.log(res);

                })
                .catch((err) => {
                    console.log(err);

                });

            history.push({
                pathname: `/`
            })

        //   add modal popup of successful post
        }
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
                            <Row className={"justify-content-center"}>
                                <Image height="400px" src={image}/>
                            </Row>
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
                                            onChange={(e) => setContent(e.target.value)}
                                            isInvalid={!! errors.content}
                                        />
                                    </Form.Group>
                                    <Button type={"submit"}>Post!</Button>
                                </Col>
                            </Form>
                        </Container>
                    </Col>
                    <Col/>
                </Row>
            </Container>
        </div>
    )
}

export default CreatePost;
