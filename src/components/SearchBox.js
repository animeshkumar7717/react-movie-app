import React from 'react';
import { BsSearch } from 'react-icons/bs';

const SearchBox = ({ searchValue, setSearchValue, placeholder='Search...', searchIcon }) => {
  return (
    
    <div className="input-group search-input-container">
      {searchIcon ? (
        <span className="input-group-text search-icon">
        <BsSearch />
      </span>
      ) : ''}
      <input
        type="text"
        className="form-control search-input"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchBox;
