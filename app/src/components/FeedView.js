import {Col, Container, Image, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import Post from "./Post";
import axiosConfig from "../services/axiosConfig";

const FeedView = () => {

    const [posts, setPosts] = useState(null);

    let fake_posts = [{
        "id": 2,
        "content": 'team edward',
        "created_date": '2021-10-11 11:00:00',
        "image_url": 'test',
        "item_type": 'movie',
        "item_title": 'twilight',
        "username": 'toast'
    },
        {
            "id": 2,
            "content": 'oodles noodles',
            "created_date": '2021-10-11 11:00:00',
            "image_url": 'test',
            "item_type": 'recipe',
            "item_title": 'noodle recipe',
            "username": 'toast'
        }];

    useEffect(() => {
        //    pull all posts from backend
        axiosConfig.get(`/post/posts`)
            .then((res) => {
                    // console.log(res)
                    setPosts(res.data)
                }
            ).catch((err) => {
            console.log(err)
        })
    }, []);

    return (
        <Container fluid className={"content-body"}>
            <Row className={"justify-content-center"}>
                <Col>
                    <Row className={"justify-content-end"}>
                        <h2 className={"primary-text"}>Your Feed</h2>
                    </Row>

                </Col>
                <Col sm={5}>
                    {posts != null ? posts.map((post) => (
                        <Post
                            id={post.id}
                            date={post.createdDate}
                            title={post.itemTitle}
                            content={post.content}
                            image={post.imageUrl}
                            type={post.itemType}
                            poster={post.user.username}
                        />
                    )) : <Row className={"justify-content-center"}>
                        <Image src={`https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif`}
                               width={40}/>
                    </Row>}
                </Col>
                <Col/>

            </Row>

        </Container>
    )
}

export default FeedView;