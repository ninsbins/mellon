import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
              <Route path='/signup'>
                  <SignUpPage />
              </Route>
            <Route path='/'>
                <HomePage />
            </Route>
          </Switch>
        </Router>
    )
  }
}

export default App;
