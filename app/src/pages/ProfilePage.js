import Header from "../components/Header";
import {Button, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

const ProfilePage = () => {
    return (
        <div>
            <Header/>
            <Container fluid className={"content-body"}>
                <Row>
                    <Col>
                        <h2 className={"primary-text"}>Profile page</h2>

                    </Col>
                    <Col>
                        <Button>
                            <Link to={"/edit-profile"}>Edit profile</Link>
                        </Button>
                    </Col>
                </Row>
            </Container>

        </div>
    );
}

export default ProfilePage;