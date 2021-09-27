import Header from "../components/Header";
import {Button, Col, Container, Nav, Row, Tabs} from "react-bootstrap";
import {Link} from "react-router-dom";

const SettingsPage = () => {
    return (
        <div>
            <Header/>
            <Container fluid className={"content-body"}>
                <Row>
                    <Col className={"justify-content-right"}>
                        <Nav variant={"pills"} className={"flex-column"}>
                            <Nav.Item>
                                <Nav.Link>
                                    <Link to={"/edit-profile"}>Edit Profile</Link></Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey={"disabled"} disabled>
                                    Account Settings
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col xs={8}>
                        <h2 className={"primary-text"}>Settings</h2>

                    {/*    you can add in buttons to sign in with third party apps here*/}
                    </Col>
                </Row>
            </Container>

        </div>
    );
}

export default SettingsPage;