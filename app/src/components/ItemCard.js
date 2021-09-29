import {Link, Route, Switch, useHistory} from "react-router-dom";
import {Card, Container} from "react-bootstrap";

import "../styles/Post.css"
import FoodPage from "../pages/RecipePage";
import React from "react";

const ItemCard = (props) => {
    let history = useHistory();

    function redirectToRecipe() {
        console.log(props);
        history.push({
            pathname: '/item/recipe',
            state: {
                data: props.d
            }
        })
    }

    return (
        <Container tag="a" onClick={redirectToRecipe}>
            <Card className={"postcard"}>
                <Card.Img variant="top" src={props.image}/>
                <Card.Body>
                    <p>{props.title}</p>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default ItemCard;