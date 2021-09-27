import Header from "../components/Header";
import {Button, Col, Container, Form, Nav, Row, Tab} from "react-bootstrap";

const SettingsPage = () => {
    return (
        <div>
            <Header/>
            <Container fluid className={"content-body"}>

                <Tab.Container defaultActiveKey={"settings"}>
                    <Row>
                        <Col sm={3} className={"justify-content-end"}>
                            <Nav variant={"pills"} className={"flex-column"}>
                                <Nav.Item>
                                    <Nav.Link eventKey={"settings"}>
                                        Settings
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey={"connections"}>
                                        Account Connections
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey={"settings"}>
                                    <Container className={"rounded-card"}>
                                        <h2 className={"primary-text"}>Settings</h2>
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
                                                <Button variant="outline-primary" type="submit">
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
                                    </Container>
                                </Tab.Pane>
                                <Tab.Pane eventKey={"connections"}>
                                    <Container className={"rounded-card"}>
                                        <h2 className={"primary-text"}>Account Connections</h2>

                                    </Container>
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Container>

        </div>
    );
}

export default SettingsPage;