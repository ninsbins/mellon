import {CardDeck, Col, Container, Row} from "react-bootstrap";
import ItemCard from "./ItemCard";
import {useEffect} from "react";

// 0 = music, 1 = books, 2 = videos, 3 = recipes

const SearchResults = (props) => {
    console.log(props);

    let searchTerm = props.searchTerm || null;
    let searchResults = props.searchResults || null;
    let searchFilter = props.searchFilter || null;

    function SwitchCase(props) {
        switch(props.option) {
            //type prop will help the item card know which page to redirect to
            case "0":
                //music search
                return (
                    <ItemCard
                        type={0}
                        d={props.data}
                        id={props.data.id}
                        title={props.data.name}
                        image={props.data.images[0].url}
                    />
                );
            case "1":
                //book search
                return (
                    <ItemCard
                        type={1}
                        d={props.data}
                    />
                );
            case "2":
                //video search
                return (
                    <ItemCard
                        type={2}
                        d={props.data}
                    />
                );
            case "3":
                //food search
                return (<ItemCard
                    type={3}
                    d={props.data}
                    id={props.data.idMeal}
                    title={props.data.strMeal}
                    image={props.data.strMealThumb}
                />)
            default:
                //default catchall case
                return (<div></div>)
        }
    }

    return (
        <div>
            <Container fluid className={"content-body"}>
                {
                    searchResults != null ? (
                        <Container className={"py-4 px-4"}>
                            <h2 className={"primary-text"}>Results for '{searchTerm}'</h2>
                            <Row xs={1} sm={2} md={4} className="grid">
                                {searchResults.map((e) => (
                                    <Col>
                                        <SwitchCase option={searchFilter}
                                                    data={e}/>
                                    </Col>
                                ))}
                            </Row>
                        </Container>) : (
                        <Row className={"justify-content-center"}>No results for '{searchTerm}'</Row>
                    )
                }
            </Container>

        </div>
    )

}

export default SearchResults;