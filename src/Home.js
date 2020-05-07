import React, {Component} from 'react';
import axios from 'axios';
import config from './config';
import {Link} from 'react-router-dom';

class Home extends Component{
    constructor(){
        super();
        this.state = {
            movieList: []   // Declaring an empty array at the state
        }
    }

    // We are using the componentDidMount() method for the API request
    // that we are going to make using the Axios library, in return we 
    // will be getting the data back on recent movies. The data will be 
    // coming back in the JSON format, and we will be extracting the  
    // results' array, which contains an array of 20 objects, each object  
    // carries information such as movie title, budget, overview etc. We  
    // will store this array of objects in the "movieList" array that we 
    // initially declared above. 

    componentDidMount(){
        const nowPlayingUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${config.api_key}`; // Server Endpoint
        axios.get(nowPlayingUrl).then((response)=>{ // Making the API request
            const movieData = response.data.results 
            this.setState({
                movieList: movieData                
            })
        })
    }

    // This render method will run the first time before componentDidmount()
    // method runs, at that time the movieList array will be empty, but 
    // after componentDidMount() runs the movieList array will be filled up
    // with array of object we got back from the server, the "movieGrid"
    // variable will map through each object and we will extract the 
    // value of the "poster_path" from each object and append it to the 
    // imageUrl and that will give us the link of the image of that movie
    // poster. We get the images for each movie and display them on our home
    // page, clicking on each poster it will direct the user to the Movie.js 
    // page for that particular movie.  

    render(){
        const imageUrl = "http://image.tmdb.org/t/p/w300"
        const movieGrid = this.state.movieList.map((movie, index)=>{
                return (
                <div className="col s3" key={index}>
                    <Link to={`/movie/${movie.id}`}>
                        <img src={`${imageUrl}${movie.poster_path}`}/>
                    </Link>
                </div>
            )
        })
        
        return(
            <div className="row">
                {movieGrid}
            </div>
        )  
    }
}

export default Home;

// At first render will run, as soon as render runs
// componentDidMount() method will run. This method 
// will make the Axios request, inside the Axios
// request we update the state, because we updated 
// the state another render will run and this time 
// "this.state.movieList" will be different, the array 
// will be filled up with the array of objects we 
// extracted from the response, that we got back 
// from the movie server. 