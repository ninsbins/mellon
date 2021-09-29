import {CardDeck, Container} from "react-bootstrap";
import ItemCard from "./ItemCard";

// 0 = music, 1 = books, 2 = videos, 3 = recipes

const SearchResults = (props) => {
    console.log(props);

    let searchTerm = props.searchTerm || null;
    let searchResults = props.searchResults || null;

    return (
        <div>
            <Container fluid className={"content-body"}>
                {
                    searchResults != null ? (
                        <Container className={"py-4 px-4"}>
                            <h2 className={"primary-text"}>Results for '{searchTerm}'</h2>
                            <CardDeck>
                                {
                                    searchResults.map((e) => {
                                        return (
                                            <ItemCard
                                                d={e}
                                                id={e.idMeal}
                                                title={e.strMeal}
                                                image={e.strMealThumb}
                                            />)
                                    })
                                }
                            </CardDeck>
                        </Container>) : (
                        <div>No results for '{searchTerm}'</div>
                    )
                }
            </Container>

        </div>
    )

}

export default SearchResults;