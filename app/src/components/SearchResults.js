import {Col, Container, Image, Row} from "react-bootstrap";
import ItemCard from "./ItemCard";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import Post from "./Post";

// 0 = music, 1 = books, 2 = video, 3 = recipes

const SearchResults = () => {
    let location = useLocation();
    let searchTerm = location.state.searchTerm;
    let searchFilter = location.state.searchFilter;
    let searchResults = location.state.searchResults;

    useEffect(() => {
        // console.log(searchResults);
    }, [location]);

    function SwitchCase(arr) {
        console.log(arr);
        let data = JSON.parse(JSON.stringify(arr)).arr;
        console.log(data.arr);

        switch(searchFilter) {
            //type prop will help the item card know which page to redirect to
            case "0":
                //music search
                return (
                    <ItemCard
                        type={"0"}
                        d={data}
                        id={data.id}
                        title={data.name}
                        image={data.images[0].url}
                    />
                );
            case "1":
                //book search
                return (
                    <ItemCard
                        type={"1"}
                        d={arr}
                    />
                );
            case "2":
                //movie search
                return (
                    <ItemCard
                        type={"2"}
                        d={data}
                        id={data.imdbID}
                        title={data.Title}
                        image={data.Poster}
                    />
                );
            case "3":
                //food search
                return (<ItemCard
                    type={"3"}
                    d={data}
                    id={data.idMeal}
                    title={data.strMeal}
                    image={data.strMealThumb}
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
                                {searchResults != null ? searchResults.map((result) => (
                                    <Col>
                                        <SwitchCase arr={result}/>
                                    </Col>
                                )) : <Row className={"justify-content-center"}>
                                    <Image src={`https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif`}
                                           width={40}/>
                                </Row>}
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