import React from 'react';

function SearchResults({ results }) {
  return (
    <div>
      <h2>Search Results</h2>
      {results.map((movie) => (
        <div key={movie.imdbID}>
          <h3>{movie.Title}</h3>
          <p>{movie.Year}</p>
        </div>
      ))}
    </div>
  );
}

export default SearchResults;