import {Card, Col, Container} from "react-bootstrap";
import {useHistory} from "react-router-dom";

import "../styles/Post.css"
import React from "react";

const PostCard = (props) => {
    let history = useHistory();

    function redirectToPost() {
        //replace with post url
        history.push(`/post/${props.id}`);
    }

    return (
        <Card tag="a" onClick={redirectToPost} className={"postcard"}>
            <Card.Img variant="top" src={props.image}/>
            <Card.Body>
                <Card.Text>{props.title}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default PostCard;