import {Link, useHistory} from "react-router-dom";
import {Button, Card, Container} from "react-bootstrap";

import "../styles/Post.css"

const ItemCard = () => {
    let history = useHistory();

    function redirectToItem() {
        //replace with post url
        history.push('/item');
    }

    return (
        <Container tag="a" onClick={redirectToItem} className={"postcard"}>
            <Card>
                <Card.Img variant="top" src="holder.js/100px160" />
                <Card.Body>
                    Item title
                </Card.Body>
            </Card>
        </Container>
    )
}

export default ItemCard;