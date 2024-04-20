import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import MovieList from './MovieList';
import MovieListHeading from './MovieListHeading';
import SearchBox from './SearchBox';
import AddFavourites from './AddFavourites';
import RemoveFavourites from './RemoveFavourites';
import Button from './Button';

const Main = () => {
  const [movie, setMovie] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [fevouriteSearchValue, setFevouriteSearchValue] = useState('');
  const [searchClick, setSearchClick] = useState('');
  const [favourites, setFavourites] = useState(
    JSON.parse(localStorage.getItem("favourite-movie")) || []
  );
  const [error, setError] = useState(null);

  const apiKey = 'cb859b70';

  const getMovieRequest = async(searchClick) => {
    try {
      const url = `http://www.omdbapi.com/?s=${searchClick}&apikey=${apiKey}`
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
    getMovieRequest(searchClick)
  }, [searchClick]);

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
            <SearchBox searchValue={fevouriteSearchValue} setSearchValue={setFevouriteSearchValue} />
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
              <marquee direction='top'>
                Browse through a vast collection of movies and add your favorites with just a click of a button! 
                Discover new films, search by title, and effortlessly manage your favorite movies list. 
                Simply click the Add To Favourites and heart icon &nbsp; 
                <svg
                  width='1em'
                  height='1em'
                  viewBox='0 0 16 16'
                  className='bi bi-heart-fill'
                  fill='red'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z'
                  />
                </svg>
                &nbsp; next to a movie to add it to your favorites, and remove it anytime with ease. 
                Enjoy exploring and curating your personalized list of beloved movies
              </marquee>
            </div>
          </div>
          <div className='search-container'>
            <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
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
