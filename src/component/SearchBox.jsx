import React from 'react'

const SearchBox = (props) => {
  return (
    <div className='col col-sm-4'>
      <input  
        className='form-control'
        value={props.value}
        placeholder='Type to search...'
        onChange={(e)=>props.setSearchValue(e.target.value)}
      />
    </div>
  )
}

export default SearchBox
