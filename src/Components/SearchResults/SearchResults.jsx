import React from 'react'

const SearchResults = ({ searchResults }) => {
    return (
      <div>
        {/* Mappings through searchResults*/}
        {searchResults.map((result, index) => (
          <div key={index}>
            <p>{result.Name}</p>
            <p>{result.Description}</p>
            <p>{result.Price}</p>
            <p>{result.Category}</p>
          </div>
        ))}
      </div>
    );
  };
  

export default SearchResults

