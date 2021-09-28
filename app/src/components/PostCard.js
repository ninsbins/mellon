import {Card, Col, Container, Row} from "react-bootstrap";
import {Link, useHistory} from "react-router-dom";

import "../styles/Post.css"

const PostCard = () => {
    let history = useHistory();

    function redirectToPost() {
        //replace with post url
        history.push('/post');
    }

    return (
        <Container tag="a" onClick={redirectToPost} className={"postcard"}>
            <Card>
                <Card.Img variant="top" src="holder.js/100px160" />
                <Card.Body>
                    Post title
                </Card.Body>
            </Card>
        </Container>
    )
}

export default PostCard;