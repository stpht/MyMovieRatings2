import React, { useState } from 'react';
import axios from 'axios';

function SearchBar() {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?apikey=d15532d4&s=${query}`
      );
      console.log(response.data); // For now, just log the data
      // In the next step, we'll handle displaying the data
    } catch (error) {
      console.error('Error fetching data:', error);
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
    </div>
  );
}

export default SearchBar;