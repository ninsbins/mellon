import Header from "../components/Header";

import "../styles/Home.css"
import React, {useEffect} from "react";
import {Route, useRouteMatch, Switch} from "react-router-dom";
import Feed from "../components/Feed";

const HomePage = () => {
    let {path, url} = useRouteMatch();
    // let history = useHistory();

    useEffect(() => {

    });

    return (
        <div>
            <Header/>
            {/* add behaviour that user must be logged in to see feed */}
            <Switch>
                <Route exact path={path}>
                    <Feed/>
                </Route>
            </Switch>
        </div>

    );
}

export default HomePage;