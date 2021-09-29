import {Container} from "react-bootstrap";
import ItemCard from "./ItemCard";

const SearchResults = (props) => {
    console.log(props);

    let searchTerm = props.searchTerm || null;
    let searchResults = props.searchResults || null;

    return (
        <div>
            <Container fluid className={"content-body"}>
                {
                    searchResults != null ? (
                        <Container>
                            <h2 className={"primary-text"}>Results for '{searchTerm}'</h2>
                            {searchResults}
                            <ItemCard>

                            </ItemCard>
                        </Container>) : (
                        <div>No results for '{searchTerm}'</div>
                    )
                }
            </Container>

        </div>
    )

}

export default SearchResults;