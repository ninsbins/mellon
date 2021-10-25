import {Button, Col, Container, Image, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import axiosConfig from "../services/axiosConfig";
import FeedStream from "./FeedStream";
import authService from "../services/authService";

const Feed = () => {

    const [posts, setPosts] = useState(null);
    const [feedView, setFeedView] = useState('feed');
    const [user, setUser] = useState(null);

    useEffect(() => {
        //    pull all posts from backend
        const currentUser = authService.getCurrentUser().username;
        setUser(currentUser);

        axiosConfig.get(`/post/posts`)
            .then((res) => {
                    // console.log(res)
                    setPosts(res.data)
                }
            ).catch((err) => {
            console.log(err)
        })

    }, []);


    const getFeedPosts = () => {
        setFeedView('feed');
        axiosConfig.get(`/post/posts`)
            .then((res) => {
                    // console.log(res)
                    setPosts(res.data)
                }
            ).catch((err) => {
            console.log(err)
        });
    };

    const getFollowingPosts = () => {
        setFeedView('following');
        axiosConfig.get(`/post/followingposts`)
            .then((res) => {
                    // console.log(res)
                    setPosts(res.data)
                }
            ).catch((err) => {
            console.log(err)
        });
    };

    return (
        <>
            <Container fluid className={"content-body"}>
                <Row className={"justify-content-center"}>

                    <Col>
                        <Container style={{maxWidth: "300px", paddingBottom: "20px"}}>
                            <Row className={"justify-content-between"}>
                                {feedView === 'feed' ? (
                                    <>
                                        <a className={"primary-text"} style={{textDecoration: "underline"}}
                                           onClick={getFeedPosts}>Feed</a>
                                        <a className={"primary-text"} onClick={getFollowingPosts}>Following</a></>
                                ) : (<>
                                    <a className={"primary-text"} onClick={getFeedPosts}>Feed</a>
                                    <a className={"primary-text"} style={{textDecoration: "underline"}}
                                       onClick={getFollowingPosts}>Following</a>
                                </>)}
                            </Row>
                        </Container>
                        <Container fluid className={"feed-stream"}>
                            {posts ? posts.length > 0 ? <FeedStream posts={posts}
                                                                    user={user}/> :
                                <Row className={"justify-content-center"}>
                                    No posts to see. Try following some people to see their posts here!
                                </Row> :
                                <Row className={"justify-content-center"}>
                                    <Image src={`https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif`}
                                           width={40}/>
                                </Row>}
                        </Container>
                    </Col>
                </Row>
            </Container>
        </>

    )
}

export default Feed;