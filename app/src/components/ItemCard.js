import {useHistory} from "react-router-dom";
import {Card} from "react-bootstrap";

import "../styles/Post.css"
import React, {useEffect} from "react";

const ItemCard = (props) => {
    let history = useHistory();

    let itemType = props.type;

    useEffect(() => {
        // console.log(props.d);
        // console.log(props.title)
    }, [])

    function redirectToPage() {
        switch (itemType) {
            //add cases and pathname: '/item/music' or '/item/movie' etc
            case "0":
                console.log('redirect to music page');
                console.log(props.d);
                history.push({
                    pathname: '/item/music',
                    state: {
                        data: props.d
                    }
                });
                break;
            case "1":
                console.log('redirect to playlist page');
                console.log(props.d);
                history.push({
                    pathname: '/item/playlist',
                    state: {
                        data: props.d
                    }
                });
                break;
            case "2":
                console.log('redirect to movie page');
                history.push({
                    pathname: '/item/movie',
                    state: {
                        data: props.d
                    }
                });
                break;
            case "3":
                console.log('redirect to recipe page');
                history.push({
                    pathname: '/item/recipe',
                    state: {
                        data: props.d
                    }
                });
                break;
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