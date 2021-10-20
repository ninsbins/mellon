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
import RecipePage from "./pages/RecipePage";
import MoviePage from "./pages/MoviePage";
import MusicPage from "./pages/MusicPage";
import ChatPage from "./pages/ChatPage";
import PlaylistPage from "./pages/PlaylistPage";
import UpdateUserComponent from "./components/UpdateUserComponent";
import UpdateUserPassword from "./components/UpdateUserPassword";
import SearchResults from "./components/SearchResults";
import BookPage from "./pages/BookPage";

class App extends Component {

    render() {
        return (
            <div className={"app-bg"}>
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
                        <Route path={'/profile/:id'}>
                            <ProfilePage/>
                        </Route>
                        <Route path={'/search'}>
                            <SearchResults/>
                        </Route>

                        <Route path={'/post/:id'}>
                            <PostPage/>
                        </Route>
                        <Route path={'/create'}>
                            <CreatePost/>
                        </Route>

                        {/*item pages*/}
                        <Route path={'/item/recipe'}>
                            <RecipePage/>
                        </Route>
                        <Route path = "/item/movie">
                            <MoviePage/>
                        </Route>
                        <Route path = "/item/music">
                            <MusicPage/>
                        </Route>
                        <Route path = "/item/playlist">
                            <PlaylistPage/>
                        </Route>
                        <Route path = "/item/book">
                            <BookPage/>
                        </Route>

                        <Route path = "/chat">
                            <ChatPage/>
                        </Route>

                        {/* Testing User update for now */}
                        <Route path = "/update-user/:id" component= {UpdateUserComponent} />
                        <Route path = "/update-password/:id" component= {UpdateUserPassword} />

                        <Route path={'/'}>
                            <HomePage/>
                        </Route>
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default App;
