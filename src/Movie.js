import React, {Component} from 'react';
import config from './config';
import axios from 'axios';

class Movie extends Component{
    constructor(){
        super();
        this.state ={
            movie:{}    // Declaring an empty object at the state
        }
    }

    // In this componentDidMount() method, we are making API request
    // to the movie server by sending the particular id of a movie
    // and the api key, then we get the data of that particular movie
    // in JSON format, we store all those data in the "movie" object
    // that we initially declared. 

    componentDidMount(){
        const mid = this.props.match.params.movieId     // Extracting the Movie ID
        const singleMovieUrl = `https://api.themoviedb.org/3/movie/${mid}?api_key=${config.api_key}`
        axios.get(singleMovieUrl).then((response)=>{    // Making the API request
            this.setState({
                movie: response.data    // All data received in response is stored in the declared object
            })

        })
    }

    // The method will run first, before the componentDidMount()
    // is ran, at that time the movie object will be empty thus, 
    // there will be no movies, so "this.state.movie.title" will
    // be undefined, it will display "Loading..." to the user, 
    // and then componentDidMount() runs and gets all the data
    // of the movie from the server. Those datas are stored in
    // the "movie" object and here we extracted each of the data
    // that we needed. We have a base URL witch we initialized to
    // the imageUrl variable and appended the poster_path data
    // to this URL which will display the poster of the movie.
    // Below the poster we display the other datas we got from
    // the response, thus setting up the page for each particular
    // movie. 

    render(){
        // console.log(this.props.match)
        if(this.state.movie.title === undefined){
            return(
                <h1>Loading...</h1> // When the render runs first time before componentDidMount()
            )
        }

        const movie = this.state.movie;
        const imageUrl = `http://image.tmdb.org/t/p/w300${movie.poster_path}`;
        
        return(
            <div>
                <img src={imageUrl}/>
                <p><strong>{movie.title}</strong></p>
                <p><strong>Budget: {movie.budget}</strong></p>
                <p><strong>Tagline: {movie.tagline}</strong></p>
                <p><strong>Overview: {movie.overview}</strong></p>
                <p><strong>Poster-Path: {movie.poster_path}</strong></p>
            </div>
        )
    }
}

export default Movie;