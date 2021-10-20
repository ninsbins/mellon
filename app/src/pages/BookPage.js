import {useHistory, useLocation} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import {Button, Col, Container, Image, Row} from "react-bootstrap";

const BookPage = () => {

    let location = useLocation();
    let history = useHistory();
    let info = location.state.data;

    let fullStar = (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                           className="bi bi-star-fill" viewBox="0 0 16 16">
        <path
            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
    </svg>);

    let emptyStar =
        (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star"
              viewBox="0 0 16 16">
            <path
                d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
        </svg>);

    useEffect(() => {
        console.log(info);
    }, []);

    //This function is called when the 'Share' button is clicked.
    function handleClick() {
        history.push({
            pathname: '/create',
            state: {
                type: 'Book',
                title: info.title,
                image: info.imageLinks.thumbnail
            }
        })
    }

    const getRating = (num) => {
        const stars = [];

        for (let i = 0; i < num; i++) {
            stars.push(fullStar);
        }

        for (let i = 0; i < 5 - num; i++) {
            stars.push(emptyStar);
        }

        return stars;
    }

    return (
        <div>
            <Header/>
            <Container fluid className={"content-body"}>
                <Row className={"justify-content-center"}>
                    <Col>
                        <Row className={"justify-content-end"}>
                            <h1>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-book" viewBox="0 0 16 16">
                                    <path
                                        d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
                                </svg>
                            </h1>
                        </Row>
                    </Col>
                    <Col sm={6}>
                        <Container className={"rounded-card"}>
                            <Col>
                                <h2 className={"primary-text"}>{info.title}</h2>
                                <Row className={"justify-content-center"}>
                                    <Col>
                                        <Image width="300px" src={info.imageLinks.thumbnail}/>
                                    </Col>
                                    <Col>
                                        <Row>{getRating(info.averageRating)}</Row>
                                        <Row class={"justify-content-space-between"}>
                                            <Col>
                                                <Row><strong>Year</strong></Row>
                                                <Row><strong>Author/s</strong></Row>
                                                <Row><strong>Category</strong></Row>
                                            </Col>
                                            <Col>
                                                <Row>{info.publishedDate}</Row>
                                                <Row>{info.authors}</Row>
                                                <Row>{info.categories}</Row>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <a href={info.infoLink}>More info</a>
                                            <a href={info.previewLink}>Preview</a>
                                        </Row>

                                        {/*<Row class={"justify-content-space-between"}>*/}
                                        {/*    <Col>*/}
                                        {/*        <strong>Type</strong>*/}
                                        {/*    </Col>*/}
                                        {/*    <Col>*/}
                                        {/*        {info.Type}*/}
                                        {/*    </Col>*/}
                                        {/*</Row>*/}

                                        {/*<Row class={"justify-content-space-between"}>*/}
                                        {/*    <Col>*/}
                                        {/*        <strong>Runtime</strong>*/}
                                        {/*    </Col>*/}
                                        {/*    <Col>*/}
                                        {/*        {moreMovieInfo === null ? '' :  moreMovieInfo.Runtime}*/}
                                        {/*    </Col>*/}
                                        {/*</Row>*/}

                                        {/*<p> </p>*/}


                                    </Col>
                                </Row>
                                <Row>
                                    <p><strong>Description</strong></p>
                                    <p>{info.description}</p>
                                </Row>
                                <Row className={"justify-content-center"} style={{marginTop: "40px"}}>
                                    <Button onClick={handleClick}>
                                        Share
                                    </Button>
                                </Row>

                            </Col>

                        </Container>
                    </Col>
                    <Col></Col>
                </Row>

            </Container>
        </div>
    );
}

export default BookPage;