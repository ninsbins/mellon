import Header from "../components/Header";

import "../styles/Home.css"
import React, {useEffect} from "react";
import {Route, useRouteMatch, Switch} from "react-router-dom";
import Feed from "../components/Feed";
import authService from "../services/authService";
import SignUpPage from "./SignUpPage";
import SearchResults from "../components/SearchResults";

const HomePage = () => {
    let {path, url} = useRouteMatch();
    // let history = useHistory();

    return (
        <div>
            <Header/>
            {/* add behaviour that user must be logged in to see feed */}
            {authService.getCurrentUser() ? (
                <Feed/>
            ) : (
                <SignUpPage/>
            )}

            {/*<Switch>*/}
            {/*    <Route exact path={path}>*/}
            {/*        <Feed/>*/}
            {/*    </Route>*/}
            {/*</Switch>*/}
        </div>


    );
}

export default HomePage;