import React, {useEffect, useState} from "react";
import {Button, Col, Container, Dropdown, DropdownButton, FormControl, Image, Row} from "react-bootstrap";
import {InputGroup} from "reactstrap";
import {Link} from "react-router-dom";

import "../styles/Post.css"
import axiosConfig from "../services/axiosConfig";


const Post = (props) => {

    const [comments, setComments] = useState(null);

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

    const handleSelect = async (eventKey) => {
        console.log(eventKey);
        //    handle delete post

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
    }, []);

    //component to display on news feed
    return (
        <Container className={"rounded-card post-box"}>
            <Row className={"flex justify-space-between align-content-center"}>
                <Col>
                    <Row className={""}>
                        <div className={"profile-pic-sm"}
                             style={{backgroundImage: `url(${process.env.PUBLIC_URL}/assets/logo.png`,}}
                        />
                        <h2 className={"primary-text"}>
                            {/*<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"*/}
                            {/*     style={{marginRight: "15px"}} fill="currentColor"*/}
                            {/*     className="bi bi-person-circle" viewBox="0 0 16 16">*/}
                            {/*    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>*/}
                            {/*    <path fill-rule="evenodd"*/}
                            {/*          d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>*/}
                            {/*</svg>*/}

                            <Link className={"secondary-text"} to={`/profile/${props.poster}`}>{props.poster}</Link>

                        </h2>
                    </Row>

                </Col>
                {/*<Col sm={{span: 1, offset: 1}} style={{marginRight: "10px"}}>*/}
                {/*    <Dropdown onSelect={handleSelect}>*/}
                {/*        <Dropdown.Toggle variant="secondary">*/}
                {/*            /!*<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"*!/*/}
                {/*            /!*     className="bi bi-three-dots" viewBox="0 0 16 16">*!/*/}
                {/*            /!*    <path*!/*/}
                {/*            /!*        d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>*!/*/}
                {/*            /!*</svg>*!/*/}
                {/*        </Dropdown.Toggle>*/}
                {/*        <Dropdown.Menu>*/}
                {/*            <Dropdown.Item>*/}
                {/*                /!*check if the post belongs to the user*!/*/}
                {/*                Delete*/}
                {/*            </Dropdown.Item>*/}
                {/*        </Dropdown.Menu>*/}
                {/*    </Dropdown>*/}
                {/*</Col>*/}
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