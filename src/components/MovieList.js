import React from 'react';

const MovieList = (props) => {
    const FavouriteComponent = props.favouriteComponent;

    return (
        <>
            {props.movies.map((movie, index) => (
                <div className='image-container d-flex flex-column align-items-center m-3' key={index} style={{ margin: '50px', position: 'relative' }}>
                    <div className='images'>
                        <img src={movie.Poster} alt='movie' style={{ width: '200px', height: '300px' }} />
                    </div>
                    <span>{movie.Title}</span>
                    <span>{movie.Year}</span>
                    <div
                        onClick={() => props.handleFavouriteClick(movie)}
                        className='overlay d-flex align-items-center justify-content-center'
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.6)', opacity: 0, transition: 'opacity 0.3s', cursor: 'pointer' }}
                    >
                        <FavouriteComponent />
                    </div>
                </div>
            ))}
        </>
    );
};

export default MovieList;
