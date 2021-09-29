import {useHistory} from "react-router-dom";
import {Card, Container} from "react-bootstrap";

import "../styles/Post.css"

const ItemCard = () => {
    let history = useHistory();

    function redirectToItem() {
        //replace with post url
        history.push('/item');
    }

    return (
        <Container tag="a" onClick={redirectToItem}>
            <Card className={"postcard"}>
                <Card.Img variant="top" src="holder.js/100px160" />
                <Card.Body>
                    Item title
                </Card.Body>
            </Card>
        </Container>
    )
}

export default ItemCard;