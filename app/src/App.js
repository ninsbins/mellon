import React, {Component} from 'react';
import './custom.scss';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import AboutPage from "./pages/AboutPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import PostPage from "./pages/PostPage";
import CreatePost from "./pages/CreatePost";
import ItemPage from "./pages/ItemPage";

class App extends Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route path={'/signup'}>
                        <SignUpPage/>
                    </Route>
                    <Route path={'/login'}>
                        <LoginPage/>
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
                    <Route path={'/post'}>
                        <PostPage/>
                    </Route>

                    <Route path={'/item'}>
                        <ItemPage/>
                    </Route>

                    <Route path={'/create'}>
                        <CreatePost/>
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
