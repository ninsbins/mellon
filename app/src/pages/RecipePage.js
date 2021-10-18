import Header from "../components/Header";
import {Button, Col, Container, Image, Row} from "react-bootstrap";
import {useHistory, useLocation} from "react-router-dom";
import React, {useEffect} from "react";

const RecipePage = (props) => {
    //this is important to ensure the response data gets passed down to the page
    let location = useLocation();
    let history = useHistory();

    let info = location.state.data;

    useEffect(() => {
        console.log(location.state.data);

    }, [location]);

    function getIngredients() {
        let list = [];
        for (let i = 1; info[`strIngredient${i}`]; i++) {
            // const ingredient = `${<p>{info[`strMeasure${i}`]} {info[`strIngredient${i}`]}</p>}`
            const ingredient = `- ${info[`strMeasure${i}`]} ${info[`strIngredient${i}`]} ` + '\n';
            list.push(ingredient);
        }
        return list;

    }

    function mealCategory(){
        const category = `${info[`strCategory`]}`
        return category
    }

    function getInstructions() {
        const instructions = `${info[`strInstructions`]}`
        return instructions;
    }

    function getVideo() {
        const video = `${info[`strYoutube`]}`
        const val = video.split("=")

        const watch = val[1]
        return "https://www.youtube.com/embed/" + watch;

    }

    function handleClick() {
        history.push({
            pathname: '/create',
            state: {
                type: 'Recipe',
                title: info.strMeal,
                image: info.strMealThumb
            }
        })
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
                                     className="bi bi-egg-fried" viewBox="0 0 16 16">
                                    <path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                    <path
                                        d="M13.997 5.17a5 5 0 0 0-8.101-4.09A5 5 0 0 0 1.28 9.342a5 5 0 0 0 8.336 5.109 3.5 3.5 0 0 0 5.201-4.065 3.001 3.001 0 0 0-.822-5.216zm-1-.034a1 1 0 0 0 .668.977 2.001 2.001 0 0 1 .547 3.478 1 1 0 0 0-.341 1.113 2.5 2.5 0 0 1-3.715 2.905 1 1 0 0 0-1.262.152 4 4 0 0 1-6.67-4.087 1 1 0 0 0-.2-1 4 4 0 0 1 3.693-6.61 1 1 0 0 0 .8-.2 4 4 0 0 1 6.48 3.273z"/>
                                </svg>
                            </h1>
                        </Row>
                    </Col>
                    <Col sm={6}>
                        <Container className={"rounded-card"}>
                            <Col>
                                <h2 className={"primary-text"}>{info.strMeal}</h2>
                                <Row className={"justify-content-center"}
                                style={{paddingTop: "15px", paddingBottom: "15px"}}>
                                    <Image width="600px" src={info.strMealThumb}/>
                                </Row>
                                <p><strong>Category</strong></p>
                                <p>{mealCategory()}</p>

                                <p><strong>Ingredients</strong></p>
                                <p>{getIngredients()}</p>

                                <p><strong>Instructions</strong></p>
                                <p>{getInstructions()}</p>

                                <p><strong>Demo Video</strong></p>
                                <Row className={"justify-content-center"}>
                                    <iframe width="420" height="315" src={(getVideo())}/>
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
    )
}

export default RecipePage;