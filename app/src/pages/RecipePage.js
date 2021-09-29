import Header from "../components/Header";
import {Button, Col, Container, Image, Row} from "react-bootstrap";
import {Link, useLocation} from "react-router-dom";
import React, {useEffect, useState} from "react";

const RecipePage = (props) => {
    //these are items that represent things retrieved from apis
    let location = useLocation();

    let info = location.state.data;

    useEffect(() => {
        console.log(location.state.data);

    }, [location]);

    function getIngredients() {
        let list = [];
        for (let i = 1; info[`strIngredient${i}`]; i++) {
            const ingredients = `- ${info[`strMeasure${i}`]} ${info[`strIngredient${i}`]}`
            list.push(ingredients);
        }
        return list;
    }

    function getInstructions() {
        const instructions = `${info[`strInstructions`]}`
        return instructions;
    }

    return (
        <div>
            <Header/>
            <Container fluid className={"content-body"}>
                <Row className={"justify-content-center"}>
                    <Col>
                        <Row className={"justify-content-end"}>
                            <h2 className={"primary-text"}>Recipe</h2>
                        </Row>
                    </Col>
                    <Col sm={6}>
                        <Container className={"rounded-card"}>
                            <Col>
                                <p>{info.strMeal}</p>
                                <Image src={info.strMealThumb}/>
                                <p>{getIngredients()}</p>
                                <p>{getInstructions()}</p>
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

export default RecipePage;