import {useEffect, useState} from "react";
import {Button, Container, FormControl, Image, Row} from "react-bootstrap";
import {InputGroup} from "reactstrap";
import {Link} from "react-router-dom";


const Post = (props) => {
    const [comment, setComment] = useState("");

    const date = JSON.parse(props.date);

    const postComment = async () => {
        setComment("");
    }

    //component to display on news feed
    return (
        <Container className={"rounded-card post-box"}>
            <h2 className={"primary-text"}>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                     className="bi bi-person-circle" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                    <path fill-rule="evenodd"
                          d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                </svg>      {props.poster}
            </h2>
            <h3><Link to={`/post/${props.id}`}>{props.title}</Link></h3>
            <p className={"timestamp"}>{date}</p>
            <Row className={"justify-content-center"}>
                <Image width="400px" src={props.image}/>
            </Row>
            <p>{props.content}</p>
            <InputGroup>
                <FormControl
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                    placeholder={"Write a comment..."}/>
                <Button variant={"outline-secondary"} id={"comment-button"} onClick={postComment}>
                    Comment
                </Button>
            </InputGroup>
        </Container>
    );
}

export default Post;