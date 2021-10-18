import Header from "../components/Header";
import {Badge, Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {useHistory, useLocation} from "react-router-dom";
import axios from "axios";


const MoviePage = () => {
    //this is important to ensure the response data gets passed down to the page
    let location = useLocation();
    let history = useHistory();
    let info = location.state.data;
    const [moreMovieInfo, setInfo] = useState(null); //store the api json response

    useEffect(() => {
        //Call omdb api again but using ID instead of Search
        axios.get(`http://www.omdbapi.com?apikey=78f2db02&i=${info.imdbID}`)
            .then((response)=>{
                setInfo(response.data); //set State
                console.log("issue here: " + response.data.Runtime)
                //console.log("checking the state variable has beeen state: " + moreMovieInfo.Plot) this will cause issue
            })
    }, [location])


    //This function is called when the 'Share' button is clicked.
    function handleClick() {
        history.push({
            pathname: '/create',
            state: {
                type: 'Movie',
                title: info.Title,
                image: info.Poster
            }
        })
    }

    //Note: Plot and Runtime issue because needs to be re-rendered
    return (
        <div>
            <Header/>
            <Container fluid className={"content-body"}>
                <Row className={"justify-content-center"}>
                    <Col>
                        <Row className={"justify-content-end"}>
                            <h1>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-film" viewBox="0 0 16 16">
                                    <path
                                        d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm4 0v6h8V1H4zm8 8H4v6h8V9zM1 1v2h2V1H1zm2 3H1v2h2V4zM1 7v2h2V7H1zm2 3H1v2h2v-2zm-2 3v2h2v-2H1zM15 1h-2v2h2V1zm-2 3v2h2V4h-2zm2 3h-2v2h2V7zm-2 3v2h2v-2h-2zm2 3h-2v2h2v-2z"/>
                                </svg>
                            </h1>
                        </Row>
                    </Col>
                    <Col sm={6}>
                        <Container className={"rounded-card"}>
                            <Col>
                                <h2 className={"primary-text"}>{info.Title}</h2>
                                <Row className={"justify-content-center"}>
                                    <Col>
                                        <Image width="300px" src={info.Poster}/>
                                    </Col>
                                    <Col>
                                        <Row class={"justify-content-space-between"}>
                                            <Col>
                                                <strong>Year</strong>
                                            </Col>
                                            <Col>
                                                {info.Year}
                                            </Col>
                                        </Row>

                                        <Row class={"justify-content-space-between"}>
                                            <Col>
                                                <strong>Type</strong>
                                            </Col>
                                            <Col>
                                                {info.Type}
                                            </Col>
                                        </Row>

                                        <Row class={"justify-content-space-between"}>
                                            <Col>
                                                <strong>Runtime</strong>
                                            </Col>
                                            <Col>
                                                {moreMovieInfo === null ? '' :  moreMovieInfo.Runtime}
                                            </Col>
                                        </Row>

                                        <p> </p>

                                        <p><strong>Plot</strong></p>
                                        <p>{moreMovieInfo === null ? 'loading' : moreMovieInfo.Plot}</p>

                                    </Col>
                                </Row>
                                <Row className={"justify-content-center"} style={{marginTop: "40px"}}>
                                    <Button onClick={handleClick}>
                                        Share
                                    </Button>
                                </Row>

                            </Col>

                        </Container>
                    </Col>
                    <Col></Col>
                </Row>

            </Container>
        </div>
    )
}

/**
 * api response from omdb api, searching by movieID
 * {
    "Title": "Harry Potter and the Goblet of Fire",
    "Year": "2005",
    "Rated": "PG-13",
    "Released": "18 Nov 2005",
    "Runtime": "157 min",
    "Genre": "Adventure, Family, Fantasy",
    "Director": "Mike Newell",
    "Writer": "Steve Kloves, J.K. Rowling",
    "Actors": "Daniel Radcliffe, Emma Watson, Rupert Grint",
    "Plot": "Harry Potter finds himself competing in a hazardous tournament between rival schools of magic, but he is distracted by recurring nightmares.",
    "Language": "English, French, Latin",
    "Country": "United Kingdom, United States",
    "Awards": "Nominated for 1 Oscar. 13 wins & 44 nominations total",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTI1NDMyMjExOF5BMl5BanBnXkFtZTcwOTc4MjQzMQ@@._V1_SX300.jpg",
    "Ratings": [
        {
            "Source": "Internet Movie Database",
            "Value": "7.7/10"
        },
        {
            "Source": "Rotten Tomatoes",
            "Value": "88%"
        },
        {
            "Source": "Metacritic",
            "Value": "81/100"
        }
    ],
    "Metascore": "81",
    "imdbRating": "7.7",
    "imdbVotes": "573,611",
    "imdbID": "tt0330373",
    "Type": "movie",
    "DVD": "07 Mar 2006",
    "BoxOffice": "$290,417,905",
    "Production": "Warner Bros., 1492 Pictures, Heyday Films",
    "Website": "N/A",
    "Response": "True"
}
 */

export default MoviePage;