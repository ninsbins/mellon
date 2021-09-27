import {Container} from "react-bootstrap";

const SearchResults = (props) => {
    console.log(props);

    let searchResults = props.searchResults;

    return (
        <div>
            <Container fluid className={"content-body"}>
                <h2 className={"primary-text"}>Results for '{props.searchTerm}'</h2>
                {searchResults}
            </Container>
        </div>

    )

}

export default SearchResults;