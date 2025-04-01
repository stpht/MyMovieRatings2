import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import SearchResults from './SearchResults';

function SearchBar({ onSelect, onQueryChange }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  console.log('onQueryChange prop:', onQueryChange); // Added console.log

  const filterAndSortSuggestions = useCallback((allResults) => {
    const filteredResults = allResults.filter((movie) =>
      movie.Title.toLowerCase().startsWith(query.toLowerCase())
    );

    const sortedResults = filteredResults.sort((a, b) =>
      a.Title.localeCompare(b.Title)
    );

    setSuggestions(sortedResults.slice(0, 9));
  }, [query]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length >= 3) {
        try {
          const response = await axios.get(
            `http://www.omdbapi.com/?apikey=d15532d4&s=${query}`
          );
          if (response.data.Search) {
            filterAndSortSuggestions(response.data.Search);
          } else {
            setSuggestions([]);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [query, filterAndSortSuggestions]);

  const handleSelect = (movie) => {
    setQuery(movie.Title);
    setSuggestions([]); // Clear suggestions on select
    onSelect(movie); // Call parent's onSelect function
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a movie..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          if (onQueryChange) {
            onQueryChange(); // Call onQueryChange if it exists
          }
        }}
      />
      {query.length >= 3 && <SearchResults results={suggestions} onSelect={handleSelect} />}
    </div>
  );
}

export default SearchBar;