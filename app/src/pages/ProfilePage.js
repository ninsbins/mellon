import Header from "../components/Header";
import {Button, Col, Container, Nav, Row, Tab} from "react-bootstrap";
import PostCard from "../components/PostCard";
import ItemCard from "../components/ItemCard";

const ProfilePage = () => {
    return (
        <div>
            <Header/>
            <Container fluid className={"content-body"}>
                <div className={"profile-header"}>
                    <Row>
                        <Col sm={3}>
                            <h2 className={"primary-text"}>Profile page</h2>
                        </Col>
                        <Col sm={9}>
                            {/*<Button variant={"outline-primary"}>*/}
                            {/*    <Link to={"/settings"}>*/}
                            {/*        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"*/}
                            {/*             className="bi bi-gear-fill" viewBox="0 0 16 16">*/}
                            {/*            <path*/}
                            {/*                d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>*/}
                            {/*        </svg></Link>*/}
                            {/*</Button>*/}
                        </Col>
                    </Row>
                </div>
                <div className={"profile-body"}>
                    <Tab.Container defaultActiveKey={"recent"}>
                        <Row className={"justify-content-center"}>
                            <Col className={"justify-content-end"}>
                                <Nav variant={"pills"} className={"flex-column"}>
                                    <Nav.Item>
                                        <Nav.Link eventKey={"recent"}>
                                            Recent
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey={"music"}>
                                            Music
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <Col sm={9}>

                                <Tab.Content>
                                    <Tab.Pane eventKey={"recent"}>
                                        <Container className={"rounded-card"}>
                                            {/*map card grid*/}
                                            Recent
                                            <PostCard>

                                            </PostCard>
                                        </Container>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey={"music"}>
                                        <Container className={"rounded-card"}>
                                            {/*map card grid*/}
                                            Music
                                            <ItemCard>

                                            </ItemCard>
                                        </Container>
                                    </Tab.Pane>
                                </Tab.Content>

                            </Col>
                        </Row>
                    </Tab.Container>
                </div>
            </Container>

        </div>
    );
}

export default ProfilePage;