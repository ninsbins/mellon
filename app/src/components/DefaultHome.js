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
        <div>
            <Container fluid className={"content-body"}>
                <Row className={"justify-content-center"}>
                    <Col>
                        <h2 className={"primary-text"}> News Feed</h2>

                        Users: {users}

                    </Col>

                </Row>

            </Container>
        </div>

    )
}

export default DefaultHome;