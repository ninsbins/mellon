import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import AboutPage from "./pages/AboutPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";

class App extends Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route path={'/signup'}>
                        <SignUpPage/>
                    </Route>
                    <Route path={'/about'}>
                        <AboutPage/>
                    </Route>
                    <Route path={'/settings'}>
                        <SettingsPage/>
                    </Route>
                    <Route path={'/profile'}>
                        <ProfilePage/>
                    </Route>

                    <Route path={'/'}>
                        <HomePage/>
                    </Route>
                </Switch>
            </Router>
        )
    }
}

export default App;
