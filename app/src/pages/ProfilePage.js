import Header from "../components/Header";
import {Container, Row} from "react-bootstrap";

const ProfilePage = () => {
    return (
        <div className={"content-body"}>
            <Header/>
            <Container fluid>
                <Row>
                    <h2 className={"primary-text"}>Profile page</h2>
                </Row>
            </Container>

        </div>
    );
}

export default ProfilePage;