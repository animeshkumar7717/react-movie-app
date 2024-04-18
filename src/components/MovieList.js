import React from 'react';

const MovieList = (props) => {
    const FavouriteComponent = props.favouriteComponent;

    return (
        <>
            {props.movies.map((movie, index) => (
                <div className='image-container d-flex flex-column align-items-center m-3' key={index} style={{ margin: '50px' }}>
                    <div className='images'>
                        <img src={movie.Poster} alt='movie' style={{ width: '200px', height: '300px' }} />
                    </div>
                    <span>{movie.Title}</span>
                    <span>{movie.Year}</span>
                    <div
                        onClick={() => props.handleFavouriteClick(movie)}
                        className='overlay d-flex align-items-center justify-content-center'
                    >
                        <FavouriteComponent />
                    </div>
                </div>
            ))}
        </>
    );
};

export default MovieList;
