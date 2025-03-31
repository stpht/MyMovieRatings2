// src/components/SearchResults.js
import React from 'react';
import styled from 'styled-components';

const SuggestionsPanel = styled.div`
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 1rem;
  margin-top: 0.5rem;
  width: 300px; /* Adjust width as needed */
  position: absolute; /* Position below the search bar */
  z-index: 10; /* Ensure it's above other elements */
`;

const SuggestionItem = styled.div`
  padding: 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

function SearchResults({ results, onSelect }) {
  if (!results || !Array.isArray(results)) {
    return null; // Don't render if no results
  }

  return (
    <SuggestionsPanel>
      {results.map((movie) => (
        <SuggestionItem key={movie.imdbID} onClick={() => onSelect(movie)}>
          {movie.Title}
        </SuggestionItem>
      ))}
    </SuggestionsPanel>
  );
}

export default SearchResults;