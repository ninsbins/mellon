import React, {useEffect, useState} from "react";
import {Button, Col, Container, Dropdown, Image, Row} from "react-bootstrap";
import {Link, useHistory} from "react-router-dom";

import "../styles/Post.css"
import axiosConfig from "../services/axiosConfig";

const Post = (props) => {
    const history = useHistory();

    const [comments, setComments] = useState(null);
    const [picture, setPicture] = useState(null);

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

    useEffect(async () => {
        // console.log(props);

        await axiosConfig.get(`/post/${props.id}/comments`)
            .then((res) => {
                // console.log(res.data);
                setComments(res.data);
            })
            .catch((err) => {
                console.log(err);
            })

        await axiosConfig
            .get(`/user/getprofilepicture?username=${props.poster}`)
            .then((response) => {
                if (response.status === 200) {
                    // console.log(response.data.data)
                    if (response.data.data) {
                        const userProfileImageBase64 = response.data.data
                        setPicture(`data:image/jpg;base64, ${userProfileImageBase64}`)
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleSelect = async (eventKey) => {
        console.log(eventKey);
        //    handle delete post
        await axiosConfig.delete(`/post/${props.id}`)
            .then(
                (res) => {
                    console.log(res);
                }
            ).catch((err) => {
                console.log(err)
            });
    }

    function goToProfile() {
        history.push({
                pathname: `/profile/${props.poster}`,
                state: {
                    profilePic: picture
                }
            }
        );
    }

//component to display on news feed
    return (
        <Container className={"rounded-card post-box"}>
            <Row className={"flex justify-space-between align-content-center"}>
                <Col>
                    <Row className={"align-content-center"}>
                        {picture ?
                            <div className="fill-sm"
                            >
                                <img id={"small-img"} src={picture} alt={"Profile Picture"} width={"20px"}
                                     className={"rounded-circle"}/>
                            </div> :
                            <div className={"fill-sm"}
                                 style={{
                                     backgroundImage: `url(${process.env.PUBLIC_URL}/assets/logo.png`
                                 }}
                            />}
                        <a className={"primary-text"} onClick={goToProfile}>
                            {props.poster}
                        </a>
                    </Row>

                </Col>
                {props.poster === props.user ?
                    <Col sm={{span: 1, offset: 1}} style={{marginRight: "10px"}}>
                        <Dropdown onSelect={handleSelect}>
                            <Dropdown.Toggle variant="link">
                                {/*<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"*/}
                                {/*     className="bi bi-three-dots-vertical" viewBox="0 0 16 16">*/}
                                {/*    <path*/}
                                {/*        d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>*/}
                                {/*</svg>*/}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item>
                                    Delete
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col> : <div></div>
                }

            </Row>

            <h3><Link className={"secondary-text"} to={`/post/${props.id}`}>{props.title}</Link></h3>
            <p className={"timestamp"}>{convertDate(props.date)}</p>
            <Row className={"justify-content-center"}>
                <Image height="400px" src={props.image}/>
            </Row>
            <p style={{paddingTop: "15px"}}>{props.content}</p>
            <Row style={{paddingLeft: "15px", paddingRight: "15px"}}>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                         style={{paddingRight: "5px"}}
                         fill="currentColor"
                         className="bi bi-chat-left-text" viewBox="0 0 16 16">
                        <path
                            d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                        <path
                            d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
                    </svg>
                    {comments ? (comments.length > 0 ? comments.length : "0") : "..."}
                </div>
            </Row>
            {/*<InputGroup>*/}
            {/*    <FormControl*/}
            {/*        onChange={(e) => setComment(e.target.value)}*/}
            {/*        value={comment}*/}
            {/*        placeholder={"Write a comment..."}/>*/}
            {/*    <Button variant={"outline-secondary"} id={"comment-button"} onClick={postComment}>*/}
            {/*        Comment*/}
            {/*    </Button>*/}
            {/*</InputGroup>*/}
        </Container>
    );
}

export default Post;