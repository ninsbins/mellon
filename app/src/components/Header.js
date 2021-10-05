import {
    Container,
    Dropdown,
    Form,
    Modal,
    Nav,
    Navbar,
    Row
} from "react-bootstrap";
import {Link, Route, Switch, useHistory, useRouteMatch} from "react-router-dom";

import "../styles/Header.css"
import "../styles/Home.css"

import React, {useState} from "react";
import axios from "axios";
import SearchResults from "./SearchResults";
import axiosConfig from "../services/axiosConfig";
import authHeader from '../services/authheader';

const Header = (props) => {
    const [show, setShow] = useState(false);

    const [searchTerm, setSearchTerm] = useState(null);
    const [searchFilter, setSearchFilter] = useState(null);
    const [searchResults, setSearchResults] = useState(null);

    let history = useHistory();

    //dictionary of content types in application
    const contentTypes = ['Music', 'Books', 'Movies', 'Recipes'];

    //search functions
    const search = async (term, filter) => {
        console.log('searching for ' + term + ' in ' + contentTypes[filter]);

        switch (filter) {
            case "0":
                // music search
                await musicSearch(term);
                break;
            case "1":
                // book search
                break;
            case "2":
                // movie search
                await movieSearch(term);
                break;
            case "3":
                // recipe search
                await recipeSearch(term);
                break;
        }
        setSearchFilter(null);
        setSearchTerm(null);
        setSearchResults(null);
    }

    const musicSearch = async (input) => {
        if (input) {
            axiosConfig
                .get(`/spotify/search?item=${input}`, { headers: authHeader() })
                .then((res) => {
                    if (res.status == 200) {
                        console.log(res.data.albums.items);
                        setSearchResults(res.data.albums.items)
                        history.push({
                            pathname: `/search`,
                            state: {
                                searchTerm: searchTerm,
                                searchFilter: searchFilter,
                                searchResults: res.data.albums.items
                            }
                        });
                    }
                }).catch((err) => {
                console.log(err)
            })
        }

        else {

        }
    }

    const movieSearch = async (input) => {
        if (input) {
            await axios.get(`http://www.omdbapi.com?apikey=78f2db02&s=${input}`)
                .then((res) => {
                    if (res.status == 200) {
                        console.log(res);
                        setSearchResults(res.data.Search)
                        history.push({
                            pathname: `/search`,
                            state: {
                                searchTerm: searchTerm,
                                searchFilter: searchFilter,
                                searchResults: res.data.Search
                            }
                        });
                    }
                }).catch(err => console.log(err));
        } else {

        }
    }

    const recipeSearch = async (input) => {
        if (input) {
            await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`)
                .then((res) => {
                    if (res.status == 200) {
                        console.log(res.data.meals);
                        setSearchResults(res.data.meals)
                        history.push({
                            pathname: `/search`,
                            state: {
                                searchTerm: searchTerm,
                                searchFilter: searchFilter,
                                searchResults: res.data.meals
                            }
                        });
                    }
                }).catch(err => console.log(err));

        } else {

        }

    }

    //search bar functions
    const handleSearchKeyUp = (event) => {
        event.preventDefault();
        if (event.key === 'Enter' && event.keyCode === 13) {
            if (searchFilter == null) {
                setShow(true);
            } else {
                search(searchTerm, searchFilter);
            }
        }

    }

    const handleFormSubmit = e => e.preventDefault();

    let handleSelect = async (eventKey) => {
        console.log(eventKey);
        setSearchFilter(eventKey);
    };

    //modal functions
    let handleClose = () => setShow(false);

    return (
        <>
            <Navbar variant={"dark"} className={"bg-gradient"} expand={"lg"} fixed={"top"}>
                <Container fluid>
                    <Link to="/">
                        <Navbar.Brand>
                            {/*<Image*/}
                            {/*    src={"./images/logo.png"}*/}
                            {/*    width={"30"}*/}
                            {/*    height={"30"}*/}
                            {/*/>*/}
                            mellon
                        </Navbar.Brand>
                    </Link>


                    <Nav className={"ml-auto"}>
                        <div className={"d-flex"}>
                            <Container className={"mr-5"}>
                                {/*change so search bar is only shown when logged in*/}
                                {/*filter search area*/}
                                <Row>
                                    <Dropdown onSelect={handleSelect}>
                                        <Dropdown.Toggle
                                            variant="light"
                                            id="dropdown-basic"

                                        >
                                            {searchFilter == null
                                                ? "Search filter"
                                                : contentTypes[searchFilter]}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item disabled>
                                                Search filter
                                            </Dropdown.Item>
                                            {contentTypes.map((option, index) => (
                                                <Dropdown.Item eventKey={index}>
                                                    {option}
                                                </Dropdown.Item>
                                            ))}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <Form onSubmit={handleFormSubmit}>
                                        <Form.Control
                                            type={"search"}
                                            placeholder={"Search"}
                                            className={"me-2"}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            onKeyUp={handleSearchKeyUp}
                                        />
                                    </Form>
                                </Row>
                            </Container>

                            <Nav.Link>
                                <Link to={"/about"} className={"nav-links"}>
                                    About
                                </Link>
                            </Nav.Link>
                            {/*    add in auth check when implemented*/}
                            <Nav.Link>
                                <Link to={"/profile"} className={"nav-links"}>
                                    Profile
                                </Link>
                            </Nav.Link>

                            <Nav.Link>
                                <Link to={"/settings"} className={"nav-links"}>
                                    Settings
                                </Link>
                            </Nav.Link>

                            <Nav.Link>
                                <Link to={"/login"} className={"nav-links"}>
                                    Login
                                </Link>
                            </Nav.Link>
                        </div>
                    </Nav>
                </Container>
            </Navbar>

            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    Please select a search filter and try again.
                </Modal.Body>
            </Modal>

            <Switch>
                <Route path={'/search'}>
                    <SearchResults
                        searchFilter={searchFilter}
                        searchTerm={searchTerm}
                        searchResults={searchResults}/>
                </Route>
            </Switch>
        </>
    );
}

export default Header;