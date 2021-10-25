import Header from "../components/Header";
import {Button, Col, Container, FormControl, Image, Row} from "react-bootstrap";
import {Link, useHistory, useLocation, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axiosConfig from "../services/axiosConfig";
import {InputGroup} from "reactstrap";

import "../styles/Post.css"

function CommentBubble(props) {
    // console.log(props);

    return (
        <Row style={{padding: "8px"}}>
            <Col xs={1}>
                <Link to={`/profile/${props.info.user.username}`}>
                    {props.pic ?
                        <div className="fill-sm"
                             style={{margin: "0"}}
                        >
                            <img id={"small-img"} src={props.pic} alt={"Profile Picture"}
                                 className={"rounded-circle"}/>
                        </div> :
                        <div className={"fill-sm"}
                             style={{
                                 margin: "0",
                                 backgroundImage: `url(${process.env.PUBLIC_URL}/assets/logo.png`
                             }}
                        />}
                    {props.info.user.username}
                </Link>
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
    const location = useLocation();
    const history = useHistory();

    const [postInfo, setPostInfo] = useState(null);
    const [postComments, setPostComments] = useState(null);

    const [newComment, setNewComment] = useState("");

    let date = (new Date()).toJSON();

    useEffect(async () => {

        console.log(location);

        //get post with id from backend
        await axiosConfig.get(`/post/${id}`)
            .then((res) => {
                console.log(res.data);
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
                                    <Row className={"align-content-center"}>
                                        <Link className={"secondary-text"} to={`/profile/${postInfo.user.username}`}>
                                            {location.state ?
                                                <div className="fill-sm">
                                                    <img id={"small-img"} src={location.state.profilePic}
                                                         alt={"Profile Picture"} width={"20px"}
                                                         className={"rounded-circle"}/>
                                                </div> :
                                                <div className={"fill-sm"}
                                                     style={{
                                                         backgroundImage: `url(${process.env.PUBLIC_URL}/assets/logo.png`
                                                     }}
                                                />}</Link>
                                        <Link className={"secondary-text"} to={`/profile/${postInfo.user.username}`}>
                                            <h2 className={"primary-text"} style={{marginTop: "8px"}}>{postInfo.user.username}</h2></Link>
                                    </Row>
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
                                                pic={location.state ? location.state.profilePic : null}
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