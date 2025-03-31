import React from 'react';
import styled from 'styled-components';

const SuggestionsPanel = styled.div`
  background: rgba(220, 248, 255, 0.1); // Light pastel gradient
  border-radius: 10px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1rem;
  margin-top: 0.5rem;
  width: 300px;
  position: absolute;
  z-index: 10;
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