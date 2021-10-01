import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieList from '../components/MovieList';
import MovieListHeading from "../components/MovieListHeading";
import SearchBox from "../components/SearchBox";
import '../styles/MoviePage.css';
import AddFavourites from "../components/AddFavourites";
import RemoveFavourites from "../components/RemoveFavourites";

//basically the App page
const Movie = () => {

    //set the state variables

    //variable 1 = name of variable current state
    //variable 2 = use this function to update the 1st variable.
    //useState([variable type])
    const [movies, setMovies] = useState([]);//array for holding searched movie results
    const [searchValue, setSearchValue] = useState(''); //String: the user search input. initialise to empty string
    const [favourites, setFavourites] = useState([]); //array for holding Favourite'd items


    const getMovieRequest = async () => {
        const url = `http://www.omdbapi.com?apikey=78f2db02&s=${searchValue}`; //note the backtips

        const response = await fetch(url); //stores api response
        const responseJson = await response.json(); //converts http response to json

        if(responseJson.Search) { //only if there is INPUT in searchbox. need this, otherwise there'll be an error
            //console.log(responseJson);
            setMovies(responseJson.Search); //get JSON results and display in horizontal gallery!
        }

    };

    //fire the api request whenever the search input changes
    useEffect(() => {
        getMovieRequest(searchValue);
    }, [searchValue]);

    //Function to update our state. add newly added movie to array
    const addFavouriteMovie = (movie) => {
        console.log("tryna favourite a movie id: " + movie.imdbID);

        // find if movie already there or not
        const isAlreadyFavourite = favourites.filter(
            (eachMovieObj) => eachMovieObj.imdbID === movie.imdbID
        );

        if (isAlreadyFavourite.length > 0) {
            // If already there do nothing
            console.log("ALREADY FAVOURITE'D lol :)");
            return;
        };

        const newFavouriteList = [...favourites, movie];
        setFavourites(newFavouriteList);

    };


    //Create the function that removes the movie from favourites array.
    const removeFavouriteMovie = (movie) => {
        //console.log("The movie ID you're trying to remove: " + movie.imdbID);
        //console.log(favourites.length);

        const newList = [];

        for (let favourite of favourites) { //loop through favourite'd array
            if(favourite.imdbID !== movie.imdbID) { //movies that have NOT been removed
                newList.push(favourite); //save into new array
            }
        }

        //console.log("Size of new list: " + newList.length);
        setFavourites(newList); //set new array to main State array i.e., 'favourites'
    };


    //NOTE: movielist component - added the header
    return (

        <div className='container-fluid movie-app'> {/* Render the the top of /movie page */}
            <div className='row d-flex align-items-center mt-4 mb-4'>
                <MovieListHeading heading='Movies + TV Shows' />
                <SearchBox searchValue = {searchValue} setSearchValue={setSearchValue} />
            </div>

            <div className='row'> {/* Render the images of movies */}
                <MovieList
                    movies={movies}
                    handleFavouritesClick={addFavouriteMovie}
                    favouriteComponent={AddFavourites} /* Add Favourite component!*/
                />
            </div>

            <div className='row d-flex align-items-center mt-4 mb-4'>
                <MovieListHeading heading='Your Favourites' />
            </div>

            <div className='row'> {/* Render the images of favourite'd movies */}
                <MovieList /* note: in the MovieList component*/
                    movies={favourites} /* 'favourites' = state variable */
                    handleFavouritesClick={removeFavouriteMovie} /* invoke the remove function */
                    favouriteComponent={RemoveFavourites} /* Add RemoveFavourite component!*/
                />
            </div>

        </div>
    );
};

export default Movie;
