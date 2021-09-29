import {Card, Container} from "react-bootstrap";
import {useHistory} from "react-router-dom";

import "../styles/Post.css"

const PostCard = () => {
    let history = useHistory();

    function redirectToPost() {
        //replace with post url
        history.push('/post');
    }

    return (
        <Container tag="a" onClick={redirectToPost}>
            <Card className={"postcard"}>
                <Card.Img variant="top" src="holder.js/100px160" />
                <Card.Body>
                    Post title
                </Card.Body>
            </Card>
        </Container>
    )
}

export default PostCard;