import React from 'react'

/**
 * creating a seprate movie heading list, becuase we want to access the data from Normal list
 * as well as favourite list 
 */
const MovieListHeading = (props) => {
  return (
    <div className='col'>
      {props.heading}
    </div>
  )
}

export default MovieListHeading
