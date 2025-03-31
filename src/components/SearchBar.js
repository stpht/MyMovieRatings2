import React, { useState } from 'react';
import axios from 'axios';
import SearchResults from './SearchResults'; 

function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]); // Add results state

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?apikey=d15532d4&s=${query}`
      );
      if (response.data.Search) {
        setResults(response.data.Search); // Update results state
      } else {
        setResults([]); // Clear results if no search results
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setResults([]); // Clear results on error
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
      />
      <button onClick={handleSearch}>Search</button>
      <SearchResults results={results} /> {/* Render SearchResults */}
    </div>
  );
}

export default SearchBar;