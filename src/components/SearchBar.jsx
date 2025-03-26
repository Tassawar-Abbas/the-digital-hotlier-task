import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ setSearchTerm, searchTerm, placeholder,searchInputRef  }) => {
  return (
    <div className="input-group mb-4" style={{ border: '2px solid #6082B6', borderRadius: '8px', overflow: 'hidden' }}>
      
      <span className="input-group-text" style={{ color: '#6082B6' }}>
        <FaSearch />
      </span>
      <input
        type="text"
        ref={searchInputRef}
        className="form-control text-center"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ border: 'none', boxShadow: 'none' }}
      />
    </div>
  );
};

export default SearchBar;
