import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieList from './component/MovieList';
import SearchBox from './component/SearchBox';
import MovieListHeading from './component/MovieListHeading';

import './App.css';
import AddToFavourite from './component/AddToFavourite';
import RemoveFavourite from './component/RemoveFavourite';

const App = () => {
  const [movie, setMovie] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favourites, setFavourites] = useState(
    JSON.parse(localStorage.getItem("favourite-movie")) || []
  );

  const apiKey = 'cb859b70';

  const getMovieRequest = async(searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue} wars&apikey=${apiKey}`
    const response = await fetch(url);
    const responseJSON = await response.json();

    console.log('responseJSON', responseJSON);

    if(responseJSON.Search) {
      setMovie(responseJSON.Search)
    }
  }
  useEffect(()=>{
    getMovieRequest(searchValue)
  }, [searchValue]);

  const saveToLocalStorage = (items) => {
    localStorage.setItem("favourite-movie", JSON.stringify(items))
  }

  const AddFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList)
    saveToLocalStorage(newFavouriteList)
  }

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter((fav)=> fav.imdbID !== movie.imdbID )
    setFavourites(newFavouriteList)
    saveToLocalStorage(newFavouriteList)
  }

  return (
    <div  className='container-fluid movie-app'>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading="Personal Watch List" />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className='row'>
        <MovieList 
          movies={movie}
          handleFavouriteClick={AddFavouriteMovie}
          favouriteComponent={AddToFavourite} 
        />
      </div>
      
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='favourites' />
      </div>
      <div className='row'>
        <MovieList
          movies={favourites}
          handleFavouriteClick={removeFavouriteMovie}
          favouriteComponent={RemoveFavourite} 
        />
      </div>
    </div>
  )
}

export default App
