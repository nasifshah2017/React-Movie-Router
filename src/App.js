import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import Home from './Home';
import Movie from './Movie';

// This component uses the Router to Route
// users to specific pages. The ":movieId"
// is the dynamic id that it gets from the
// Home.js page, this is the id that we received
// when we made the API request from the Home.js
// page to the movie server, going to that specific
// route with a particular id will take the user
// to the Movie.js page that they selected.

class App extends Component{
    render(){
      return (
        <Router>
          <div className="App">
            <Route exact path="/" component={Home}/>
            <Route exact path="/movie/:movieId" component={Movie}/>
          </div>
        </Router>
      );
    }
  }

export default App;
