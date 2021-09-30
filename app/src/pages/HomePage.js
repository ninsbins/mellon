import Header from "../components/Header";

import "../styles/Home.css"
import React, {useState} from "react";
import SearchResults from "../components/SearchResults";
import {Route, useHistory, useRouteMatch, Switch} from "react-router-dom";
import DefaultHome from "../components/DefaultHome";
import $ from "jquery";
import axios from "axios";

const HomePage = () => {
    const [searchState, setSearchState] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchFilter, setSearchFilter] = useState("");
    const [searchResults, setSearchResults] = useState(null);
    let {path, url} = useRouteMatch();
    let history = useHistory();

    //dictionary of content types in application
    const contentTypes = ['Music', 'Books', 'Movies', 'Recipes'];

    const search = async (term, filter) => {
        console.log('searching for ' + term + ' in ' + contentTypes[filter]);
        setSearchTerm(term);
        setSearchFilter(filter);
        //check whether there is any input in search bar
        // if (term) {
        setSearchState(true);

        switch(filter) {
            case "0":
                // music search
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
        history.push(`/search`);
    }

    // function updateSearchTerm(term) {
    //     console.log(term);
    //     setSearchTerm(term);
    // }

    const movieSearch = async (input) => {
        if (input) {
            await axios.get(`http://www.omdbapi.com?apikey=78f2db02&s=${input}`)
                .then((res) => {
                    if (res.status == 200) {
                        console.log(res);
                        setSearchResults(res.data.Search);
                    }
                }).catch(err => console.log(err));
        }
    }

    const recipeSearch = async (input) => {
        if (input) {
            await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`)
                .then((res) => {
                    if (res.status == 200) {
                        console.log(res);
                        setSearchResults(res.data.meals);
                    }
                }).catch(err => console.log(err));

        } else {

        }

    }


    return (
        <div>
            <Header
                search={search}
                // searchTerm={searchTerm}
                // updateSearchTerm={updateSearchTerm}
            />
            <Switch>
                <Route path={'/search'}>
                    <SearchResults
                        searchFilter={searchFilter}
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