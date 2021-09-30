import Header from "../components/Header";
import {Badge, Card, Col, Container, Image, Row} from "react-bootstrap";
import React, {useEffect} from "react";
import {useLocation} from "react-router-dom";


const MoviePage = () => {
    //this is important to ensure the response data gets passed down to the page
    let location = useLocation();
    let info = location.state.data;

    useEffect(() => {
        console.log(location.state.data);

    }, [location]);

    return (
        <div>
            <Header/>
            <Container fluid className={"content-body"}>
                <Row className={"justify-content-center"}>
                    <Col>
                        <Row className={"justify-content-end"}>
                            <h1>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-film" viewBox="0 0 16 16">
                                    <path
                                        d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm4 0v6h8V1H4zm8 8H4v6h8V9zM1 1v2h2V1H1zm2 3H1v2h2V4zM1 7v2h2V7H1zm2 3H1v2h2v-2zm-2 3v2h2v-2H1zM15 1h-2v2h2V1zm-2 3v2h2V4h-2zm2 3h-2v2h2V7zm-2 3v2h2v-2h-2zm2 3h-2v2h2v-2z"/>
                                </svg>
                            </h1>
                        </Row>
                    </Col>
                    <Col sm={6}>
                        <Container className={"rounded-card"}>
                            <Col>
                                <h2 className={"primary-text"}>{info.Title}</h2>
                                <Row className={"justify-content-center"}>
                                    <Col>
                                        <Image width="300px" src={info.Poster}/>
                                    </Col>
                                    <Col>
                                        <p>Year: {info.Year}</p>
                                        <p>Type: {info.Type}</p>
                                    </Col>
                                </Row>

                                {/*<Container>*/}
                                {/*    <Image src={info.img}/>*/}
                                {/*</Container>*/}
                                {/*<Container>*/}
                                {/*    <p>{info.title}</p>*/}
                                {/*    {ingredients}*/}
                                {/*</Container>*/}
                                {/*<Button variant={"primary-outline"}>*/}
                                {/*    <Link to={"/create"}>*/}
                                {/*        Share*/}
                                {/*    </Link>*/}
                                {/*</Button>*/}
                            </Col>

                        </Container>
                    </Col>
                    <Col></Col>
                </Row>

            </Container>
        </div>
    )
}

export default MoviePage;