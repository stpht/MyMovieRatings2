import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import SearchResults from './SearchResults';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const filterAndSortSuggestions = useCallback((allResults) => {
    const filteredResults = allResults.filter((movie) =>
      movie.Title.toLowerCase().startsWith(query.toLowerCase())
    );

    const sortedResults = filteredResults.sort((a, b) =>
      a.Title.localeCompare(b.Title)
    );

    setSuggestions(sortedResults.slice(0, 9));
  }, [query]); // Add query as dependency

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
  }, [query, filterAndSortSuggestions]); // Add filterAndSortSuggestions as dependency

  const handleSelect = (movie) => {
    setQuery(movie.Title);
    setSuggestions([]);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <SearchResults results={suggestions} onSelect={handleSelect} />
    </div>
  );
}

export default SearchBar;