import React from 'react';

const MovieListHeading = (props) => {
	return (
		<div className='row'>
			<h1>{props.heading}<span style={{color: 'red'}}> Watchlists</span></h1>
		</div>
	);
};

export default MovieListHeading;
