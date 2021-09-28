import Header from "../components/Header";
import {Button, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

const ItemPage = () => {
    //these are items that represent things retrieved from apis

    return (
        <div>
            <Header/>
            <Container fluid className={"content-body"}>
                <Row className={"justify-content-center"}>
                    <Col>
                        <Row className={"justify-content-end"}>
                            <h2 className={"primary-text"}>Test item</h2>
                        </Row>
                    </Col>
                    <Col sm={6}>
                        <Container className={"rounded-card"}>
                            <Col>
                                <Container>
                                    image <br/>
                                    Post description
                                </Container>
                                <Button variant={"primary-outline"}>
                                    <Link to={"/create"}>
                                        Share
                                    </Link>
                                </Button>
                            </Col>

                        </Container>
                    </Col>
                    <Col></Col>
                </Row>

            </Container>
        </div>
    )
}

export default ItemPage;