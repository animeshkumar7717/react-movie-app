import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';

const App = () => {
  const [movie, setMovie] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favourites, setFavourites] = useState(
    JSON.parse(localStorage.getItem("favourite-movie")) || []
  );
  const [error, setError] = useState(null);

  const apiKey = 'cb859b70';

  const getMovieRequest = async(searchValue) => {
    try {
      const url = `http://www.omdbapi.com/?s=${searchValue} wars&apikey=${apiKey}`
      const response = await fetch(url);
      if (!response.ok) { 
        throw new Error('Failed to fetch data');
      }
      const responseJSON = await response.json();
  
      if(responseJSON.Search) {
        setMovie(responseJSON.Search)
      }
      setError(null);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please check your internet connection.');
    }
  }
  useEffect(()=>{
    getMovieRequest(searchValue)
  }, [searchValue]);

  const saveToLocalStorage = (items) => {
    localStorage.setItem("favourite-movie", JSON.stringify(items))
  }

  const AddFavouriteMovie = (movie) => {
	const isAlreadyFavourite = favourites.some(fav => fav.imdbID === movie.imdbID);
	if(!isAlreadyFavourite) {
		const newFavouriteList = [...favourites, movie];
		setFavourites(newFavouriteList)
		saveToLocalStorage(newFavouriteList)
	}
  }

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter((fav)=> fav.imdbID !== movie.imdbID )
    setFavourites(newFavouriteList)
    saveToLocalStorage(newFavouriteList)
  }

  return (
    <div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading="Welcome To" />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      {error ? ( 
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : (
        <>
          <div className='row'>
            <MovieList 
              movies={movie}
              handleFavouriteClick={AddFavouriteMovie}
              favouriteComponent={AddFavourites} 
            />
          </div>
          <div className='row d-flex align-items-center mt-4 mb-4'>
            <MovieListHeading heading='Favourites' />
          </div>
          <div className='row'>
            <MovieList
              movies={favourites}
              handleFavouriteClick={removeFavouriteMovie}
              favouriteComponent={RemoveFavourites} 
            />
          </div>
        </>
      )}
    </div>
  )
}

export default App;