import Header from "../components/Header";
import {Button, Col, Container, FormControl, Image, Row} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosConfig from "../services/axiosConfig";
import {InputGroup} from "reactstrap";

function CommentBubble(props) {
    // console.log(props);

    return (
        <Row style={{padding: "8px"}}>
            <Col xs={1}>
                <div>
                    <Link to={`/profile/${props.info.user.username}`}> <svg xmlns="http://www.w3.org/2000/svg" width="30"
                         height="30"
                         style={{marginRight: "15px"}} fill="currentColor"
                         className="bi bi-person-circle" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                        <path fill-rule="evenodd"
                              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                    </svg>
                    </Link>
                </div>
                <div>
                    <Link to={`/profile/${props.info.user.username}`}> {props.info.user.username} </Link>
                </div>
            </Col>
            <Col>
                <Container className={"comment-box"}>
                        {props.info.content}
                </Container>
            </Col>
        </Row>
    );
}

CommentBubble.propTypes = {};

const PostPage = () => {
    // these are posts made by users that are stored on our database
    const {id} = useParams();
    const [postInfo, setPostInfo] = useState(null);
    const [postComments, setPostComments] = useState(null);

    const [newComment, setNewComment] = useState("");

    let date = (new Date()).toJSON();

    useEffect(async () => {
        //get post with id from backend
        await axiosConfig.get(`/post/${id}`)
            .then((res) => {
                // console.log(res.data.user);
                setPostInfo(res.data);
            })
            .catch((err) => {
                console.log(err);
            })

        await axiosConfig.get(`/post/${id}/comments`)
            .then((res) => {
                // console.log(res.data);
                setPostComments(res.data);
            })
            .catch((err) => {
                console.log(err);
            })

        // console.log(postComments)

    }, []);

    const postComment = async (event) => {
        // postComments.push({
        //     "user": "toast",
        //     "comment": `${comment}`
        // })
        // console.log(postComments);
        // setComment("");
        event.preventDefault();

        await axiosConfig.post(`/post/${id}/addcomment`, {
            postId: id,
            content: newComment,
            createdDate: date,
        })
            .then((res) => {
                console.log("comment posted");
            })
            .catch((err) => {
                console.log(err);
            });

        setNewComment("");

        await axiosConfig.get(`/post/${id}/comments`)
            .then((res) => {
                // console.log(res.data);
                setPostComments(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const convertDate = (date) => {
        const format = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        };
        return new Date(date).toLocaleString("en-US", format);
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
                                        {postComments && postComments.length > 0 ? postComments.map((c) => (
                                            <CommentBubble
                                                info={c}
                                            />
                                            // <div>{comment.content}</div>
                                        )) : (<Row className={"justify-content-center"}>
                                            No comments yet. Be the first to comment!
                                        </Row>)
                                        }
                                    </div>
                                    <InputGroup>
                                        <FormControl
                                            onChange={(e) => setNewComment(e.target.value)}
                                            value={newComment}
                                            placeholder={"Write a comment..."}/>
                                        <Button type={"submit"} variant={"outline-secondary"} id={"comment-button"}
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