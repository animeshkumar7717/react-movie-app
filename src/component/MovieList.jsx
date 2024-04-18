import React from 'react'

const MovieList = (props) => {
  console.log('props', props);
  const FavouriteComponent = props.favouriteComponent;
  return (
    <div>
      {props.movies.map((movie, index)=>(
        <div className='image-container d-flex justify-content-start m3'>
            <img src={movie.Poster} alt='movie' />
            <div
              className='overlay d-flex align-items-center justify-content-center'
              onClick={()=>props.handleFavouriteClick(movie)}
            > 
              <FavouriteComponent />
            </div>
        </div>
      ))}
    </div>
  )
}

export default MovieList
