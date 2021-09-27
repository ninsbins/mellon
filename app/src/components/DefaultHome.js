import {Col, Container, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import axiosConfig from "../services/axiosConfig";

const DefaultHome = () => {
    const [users, setUsers] = useState(null);

    useEffect(() => {
        axiosConfig
            .get(`/users`)
            .then((result) => {
                console.log(result);
                setUsers(result);
            }).catch((err) => {
            console.log(err)
        })
    }, []);

    return (
            <Container fluid className={"content-body"}>
                <Row className={"justify-content-center"}>
                    <Col className={"justify-content-end"}>
                        <h2 className={"primary-text"}> News Feed</h2>
                    </Col>
                    <Col sm={6}>
                        <Container className={"rounded-card"}>
                            Users: {users}
                        </Container>


                    </Col>
                    <Col></Col>

                </Row>

            </Container>
    )
}

export default DefaultHome;