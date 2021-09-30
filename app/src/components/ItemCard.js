import {Link, Route, Switch, useHistory} from "react-router-dom";
import {Card, Container} from "react-bootstrap";

import "../styles/Post.css"
import FoodPage from "../pages/RecipePage";
import React from "react";

const ItemCard = (props) => {
    let history = useHistory();

    let itemType = props.type;

    function redirectToPage() {
        switch (itemType) {
            //add cases and pathname: '/item/music' or '/item/movie' etc
            case 3:
                history.push({
                    pathname: '/item/recipe',
                    state: {
                        data: props.d
                    }
                })
        }

    }

    return (
        <Card tag="a" onClick={redirectToPage} className={"postcard"}>
            <Card.Img variant="top" src={props.image}/>
            <Card.Body>
                <Card.Text>{props.title}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default ItemCard;