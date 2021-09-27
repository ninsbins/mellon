import Header from "../components/Header";
import {Button, Col, Container, Form, Nav, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

const EditProfilePage = () => {
    return (
        <div>
            <Header/>
            <Container fluid className={"content-body"}>
                <Row>
                    <Col>
                        <Nav variant={"pills"} className={"flex-column"}>
                            <Nav.Item>
                                <Nav.Link eventKey={"disabled"} disabled>
                                    Edit Profile
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link>
                                    <Link to={"/settings"}>Settings</Link>
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col xs={8}>
                        <h2 className={"primary-text"}>Edit Profile</h2>
                        <Form>
                            <Form.Group>
                                <Form.Label>Old Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    // onChange={(e) => setOldPassword(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>New Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    // onChange={(e) => setNewPassword1(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Repeat New Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    // onChange={(e) => setNewPassword2(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Button variant="primary" type="submit">
                                    Change Password
                                </Button>
                            </Form.Group>
                            {/*handle errors*/}
                            {/*{error ? (*/}
                            {/*    <div style={{ color: "red" }}>*/}
                            {/*        Error: Couldn&#39;t change password*/}
                            {/*    </div>*/}
                            {/*) : null}*/}
                            {/*{nonMatching ? (*/}
                            {/*    <div style={{ color: "red" }}>Passwords don&#39;t match</div>*/}
                            {/*) : null}*/}
                            {/*{success ? (*/}
                            {/*    <div style={{ color: "green" }}>Changed Password</div>*/}
                            {/*) : null}*/}
                        </Form>
                    </Col>
                </Row>
            </Container>

        </div>
    );
}

export default EditProfilePage;