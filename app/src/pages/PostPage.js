import Header from "../components/Header";
import {Button, Col, Container, FormControl, Image, Row} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosConfig from "../services/axiosConfig";
import {InputGroup} from "reactstrap";
import {Comment} from "@material-ui/icons";

const PostPage = () => {
    // these are posts made by users that are stored on our database
    const {id} = useParams();
    const [postInfo, setPostInfo] = useState("");
    const [comment, setComment] = useState("");

    const [postComments, setPostComments] = useState({});

    // const date = JSON.parse(postInfo.createdDate);

    useEffect(() => {
        //get post with id from backend
        axiosConfig.get(`/post/${id}`)
            .then((res) => {
                setPostInfo(res.data);
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            })

        let c = ( {
                "user": "toast",
                "comment": "omg same",
            },
            {
                "user": "nina",
                "comment": "i love this!!!"
            });
        setPostComments(c);

    }, [postComments])

    const postComment = (event) => {
        postComments.push({
            "user": "toast",
            "comment": `${comment}`
        })
        console.log(postComments);
        setComment("");
    }

    function Comment(info) {
        console.log(info.info);

        return (
            <Row style={{padding: "8px"}}>
                <Col xs={1}>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30"
                             height="30"
                             style={{marginRight: "15px"}} fill="currentColor"
                             className="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                            <path fill-rule="evenodd"
                                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                        </svg>
                    </div>
                    <div>
                        {info.info.user}
                    </div>
                </Col>
                <Col>
                    <Row style={{padding: "5px"}}>
                        <Container className={"comment-box"}>
                            {info.info.comment}
                        </Container>

                    </Row>
                </Col>
            </Row>
        );

    }

    const convertDate = (date) => {
        return new Date(date).toString();
    }

    return (
        <div>
            <Header/>
            <Container fluid className={"content-body"}>
                <Row className={"justify-content-center"}>
                    <Col>
                    </Col>
                    <Col sm={6}>
                        <Container className={"rounded-card"}>
                            {postInfo ? (
                                <Col>
                                    <h2 className={"primary-text"}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"
                                             style={{marginRight: "15px"}} fill="currentColor"
                                             className="bi bi-person-circle" viewBox="0 0 16 16">
                                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                            <path fill-rule="evenodd"
                                                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                        </svg>
                                        {postInfo.user.username}
                                    </h2>
                                    <h3 className={"secondary-text"}>{postInfo.itemTitle}</h3>

                                    <p className={"timestamp"}>{convertDate(postInfo.createdDate)}</p>
                                    <Row className={"justify-content-center"}>
                                        <Image height="400px" src={postInfo.imageUrl}/>
                                    </Row>
                                    <p style={{paddingTop: "15px", paddingBottom: "15px"}}>{postInfo.content}</p>
                                    <div style={{padding: "10px"}}>
                                        {/*render comments*/}
                                        {postComments ? (
                                                postComments.map((comment) => (
                                                        <Comment info={comment}/>
                                                    )
                                                )
                                            ) :
                                            (<Row className={"justify-content-center"}>
                                                No comments yet. Be the first to comment!
                                            </Row>)

                                        }
                                    </div>
                                    <InputGroup>
                                        <FormControl
                                            onChange={(e) => setComment(e.target.value)}
                                            value={comment}
                                            placeholder={"Write a comment..."}/>
                                        <Button variant={"outline-secondary"} id={"comment-button"}
                                                onClick={postComment}>
                                            Comment
                                        </Button>
                                    </InputGroup>
                                </Col>
                            ) : (
                                <Row className={"justify-content-center"}>
                                    <Image src={`https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif`}
                                           width={40}/>
                                </Row>
                            )}


                        </Container>
                    </Col>
                    <Col/>
                </Row>

            </Container>
        </div>
    )
}

export default PostPage;