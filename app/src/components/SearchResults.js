import {Col, Container, Image, Row} from "react-bootstrap";
import ItemCard from "./ItemCard";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import Header from "./Header";

// 0 = music, 1 = playlists, 2 = video, 3 = recipes

const SearchResults = () => {
    let location = useLocation();
    let searchTerm = location.state.searchTerm;
    let searchFilter = location.state.searchFilter;
    let searchResults = location.state.searchResults;

    useEffect(() => {
        // console.log(searchResults);
    }, [location]);

    function SwitchCase(arr) {
        // console.log(arr);
        let data = JSON.parse(JSON.stringify(arr)).arr;
        // console.log(data.arr);
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
                //playlist search
                return (
                    <ItemCard
                        type={"1"}
                        d={data}
                        id={data.id}
                        title={data.name}
                        image={data.images[0].url}
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
                return (<div/>)
        }
    }

    return (
        <div>
            <Header/>
            <Container fluid className={"content-body"}>
                {
                    searchResults != null ? (
                        <Container className={"py-4 px-4"}>
                            <h2 className={"primary-text"}>Results for '{searchTerm}'</h2>
                            <Row xs={2} sm={3} md={4} className="grid">
                                {searchResults ? searchResults.map((result) => (
                                    <Col>
                                        <SwitchCase arr={result}/>
                                    </Col>
                                )) : <Row className={"justify-content-center"}>
                                    <Image src={`https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif`}
                                           width={40}/>
                                </Row>}
                            </Row>
                        </Container>) : (
                        <Row className={"justify-content-center"}>No results for '{searchTerm}' <svg
                            xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                            style={{paddingLeft: "5px"}} fill="currentColor"
                            className="bi bi-emoji-frown-fill" viewBox="0 0 16 16">
                            <path
                                d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm-2.715 5.933a.5.5 0 0 1-.183-.683A4.498 4.498 0 0 1 8 9.5a4.5 4.5 0 0 1 3.898 2.25.5.5 0 0 1-.866.5A3.498 3.498 0 0 0 8 10.5a3.498 3.498 0 0 0-3.032 1.75.5.5 0 0 1-.683.183zM10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8z"/>
                        </svg></Row>
                    )
                }
            </Container>

        </div>
    )

}

export default SearchResults;