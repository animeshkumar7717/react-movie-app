import React from 'react';
import { BsSearch } from 'react-icons/bs';

const SearchBox = ({ searchValue, setSearchValue }) => {
  return (
    <div className="input-group search-input-container">
      <span className="input-group-text search-icon">
        <BsSearch />
      </span>
      <input
        type="text"
        className="form-control search-input"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchBox;
