import Header from "../components/Header";
import {Container} from "react-bootstrap";

import "../styles/Home.css"
import axiosConfig from "../services/axiosConfig";
import React, {useEffect, useState} from "react";
import SearchResults from "../components/SearchResults";
import {Route, Redirect, useHistory, useRouteMatch, Switch} from "react-router-dom";
import DefaultHome from "../components/DefaultHome";

const HomePage = () => {
    const [searchState, setSearchState] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState(null);
    let {path, url} = useRouteMatch();
    let history = useHistory();

    const search = async (term) => {
        console.log('searching for ' + term);
        setSearchTerm(term);
        //check whether there is any input in search bar
        // if (term) {
        setSearchResults(term);
        setSearchState(true);
        history.push(`/search`);
        // }
    }

    // const handleSearchKeyUp = event => {
    //     event.preventDefault();
    //     if (event.key === 'Enter' && event.keyCode === 13) {
    //         this.search();
    //     }
    // }

    return (
        <div>
            <Header
                search={search}
                searchTerm={searchTerm}
                // handleSearchKeyUp={handleSearchKeyUp}
            />
            <Switch>
                <Route path={'/search'}>
                    <SearchResults
                        searchTerm={searchTerm}
                        searchResults={searchResults}/>
                </Route>
                <Route exact path={path}>
                    <DefaultHome/>
                </Route>
            </Switch>
        </div>

    );
}

export default HomePage;