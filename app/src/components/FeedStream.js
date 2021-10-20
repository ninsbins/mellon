import {Col, Container, Image, Row} from "react-bootstrap";
import Post from "./Post";

const FeedStream = (props) => {

    return (
        <Row className={"justify-content-center"}>
            <Col sm={5}>
                {props.posts.map((post) => (
                    <Post
                        id={post.id}
                        date={post.createdDate}
                        title={post.itemTitle}
                        content={post.content}
                        image={post.imageUrl}
                        type={post.itemType}
                        poster={post.user.username}
                    />
                ))}
            </Col>
        </Row>
    );
}

export default FeedStream