import {Container} from "react-bootstrap";

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
                        </Container>) : (
                        <div>No results</div>
                    )
                }
            </Container>

        </div>
    )

}

export default SearchResults;