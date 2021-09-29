import Header from "../components/Header";

import "../styles/Home.css"
import React, {useState} from "react";
import SearchResults from "../components/SearchResults";
import {Route, useHistory, useRouteMatch, Switch} from "react-router-dom";
import DefaultHome from "../components/DefaultHome";

const HomePage = () => {
    const [searchState, setSearchState] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState(null);
    let {path, url} = useRouteMatch();
    let history = useHistory();

    //dictionary of content types in application
    const contentTypes = ['Music', 'Books', 'Videos', 'Recipes'];

    const search = async (term, filter) => {
        console.log('searching for ' + term + ' in ' + contentTypes[filter]);
        setSearchTerm(term);
        //check whether there is any input in search bar
        // if (term) {
        setSearchResults(term);
        setSearchState(true);
        history.push(`/search`);
        // }
    }

    // function updateSearchTerm(term) {
    //     console.log(term);
    //     setSearchTerm(term);
    // }

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