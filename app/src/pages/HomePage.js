import Header from "../components/Header";

import "../styles/Home.css"
import React, {useEffect} from "react";
import {Route, useRouteMatch, Switch} from "react-router-dom";
import Feed from "../components/Feed";
import authService from "../services/authService";
import SignUpPage from "./SignUpPage";

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
        </div>

    );
}

export default HomePage;