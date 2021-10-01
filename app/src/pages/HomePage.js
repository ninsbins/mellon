import Header from "../components/Header";

import "../styles/Home.css"
import React, {useState} from "react";
import {Route, useHistory, useRouteMatch, Switch} from "react-router-dom";
import Feed from "../components/Feed";

const HomePage = () => {
    let {path, url} = useRouteMatch();
    // let history = useHistory();

    return (
        <div>
            <Header/>
            <Switch>
                <Route exact path={path}>
                    <Feed/>
                </Route>
            </Switch>
        </div>

    );
}

export default HomePage;