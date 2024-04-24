import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import MovieList from '../components/MovieList.js';
import MovieListHeading from '../components/MovieListHeading.js';
import SearchBox from '../components/SearchBox.js';
import AddFavourites from '../components/AddFavourites.js';
import RemoveFavourites from '../components/RemoveFavourites.js';
import Button from '../components/Button.js';

import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../store/UserSelector.js';

const Main = () => {
  const currentUser = useSelector(selectCurrentUser);
  const currentUserEmail = currentUser.email
  const [movie, setMovie] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [fevouriteSearchValue, setFevouriteSearchValue] = useState('');
  const [searchClick, setSearchClick] = useState('');
  const storedFavourites = JSON.parse(localStorage.getItem("favourite-movie")) || {};
  const currentUserFavourite =  storedFavourites[currentUserEmail] || storedFavourites[currentUser];
  const [favourites, setFavourites] = useState(Array.isArray(currentUserFavourite) ? currentUserFavourite : []);

  const [error, setError] = useState(null);

  const apiKey = 'cb859b70';

  const getMovieRequest = async(searchClick) => {
    try {
      const url = `https://www.omdbapi.com/?s=${searchClick}&apikey=${apiKey}`
      const response = await fetch(url);
      if (!response.ok) { 
        throw new Error('Failed to fetch data');
      }
      const responseJSON = await response.json();
  
      if(responseJSON.Search) {
        setMovie(responseJSON.Search)
      } else {
        setError('Movies not found!');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please check your internet connection.');
    }
  }

  useEffect(()=>{
    if(searchClick) {
      setError(null)
      getMovieRequest(searchClick);
    }
  }, [searchClick]);

  const saveToLocalStorage = (items, currentUser) => {
    try {
      const localStorageData = JSON.parse(localStorage.getItem("favourite-movie")) || {};
      localStorageData[`${currentUser.email}`] = items;
      localStorage.setItem("favourite-movie", JSON.stringify(localStorageData));
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error);
    }
  }
    

  const AddFavouriteMovie = (movie) => {
    const isAlreadyFavourite = favourites.some(fav => fav.imdbID === movie.imdbID);
    if (!isAlreadyFavourite) {
      const newFavouriteList = [...favourites, movie];
      setFavourites(newFavouriteList);
      saveToLocalStorage(newFavouriteList, currentUser);
    }
  }
  
  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter((fav)=> fav.imdbID !== movie.imdbID );
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList, currentUser);
  }  

  const onclickHandler = () => {
    setSearchClick(searchValue)
    setSearchValue('')
  }

  const onClickFavouriteHandler = () => {
    setFevouriteSearchValue('')
  }

  const filterFavoriteMovies = () => {
    return favourites.filter(movie => movie.Title.toLowerCase().includes(fevouriteSearchValue.toLowerCase()));
  };

  return (
    <div className='container-fluid movie-app'>
      <div className='bottom-section'>
        <div className='left-section col-3' >
          <div className='search-container' style={{ display: 'flex', flexDirection: 'column', padding: '20px'}}>
            <div className='row d-flex align-items-center justify-content-center mt-4 mb-4'>
              <MovieListHeading heading='Favourites' />
            </div>
            <SearchBox searchValue={fevouriteSearchValue} setSearchValue={setFevouriteSearchValue} searchIcon='true' />
            <div className='home-button' style={{ margin: '20px', width: '100%', background: 'crimson', borderRadius: '5px', padding: '5px' }}>
              <Button name='Home' onClick={onClickFavouriteHandler} />
            </div>
          </div>
            <h3 style={{ textAlign: 'center', margin: '10px', borderTop: '1px solid #ccc' }}><br />My Lists</h3>
          <div className='movie-list col-10 align-items-center' style={{ maxHeight: 'calc(100vh - 60px)', overflowY: 'auto' }}>
            <MovieList
              movies={filterFavoriteMovies()}
              handleFavouriteClick={removeFavouriteMovie}
              favouriteComponent={RemoveFavourites} 
            />
          </div>
        </div>
        <div className='right-section'>
          <div className='top-section'>
            <div className='border-red'>
              <div className='row d-flex align-items-center mb-4'>
                <MovieListHeading heading="Welcome To" />
              </div>
              <p>
                Browse through a vast collection of movies and add your favorites watchlist with just a click in a poster! 
                Discover new films, search by title, and effortlessly manage your favorite movies list. 
                Simply click the poster to add it to your favorites watchlist, and click the poster in your fevourite watchlist
                to remove it anytime with ease. 
                Enjoy exploring and curating your personalized list of beloved movies
              </p>
            </div>
          </div>
          <div className='search-container'>
            <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} searchIcon='true' />
            <Button name='Search' onClick={onclickHandler} />
          </div>
          {error ? ( 
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          ) : (
            <div className='row'>
              <MovieList 
                movies={movie}
                handleFavouriteClick={AddFavouriteMovie}
                favouriteComponent={AddFavourites} 
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )

}

export default Main;
