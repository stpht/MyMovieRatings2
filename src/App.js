import React from 'react';
import Login from './components/Login';
import Header from './components/Header';
import WatchedMovieList from './components/WatchedMovieList';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <div className="App">
      <Header />
      <SearchBar />
      <Login />
      <WatchedMovieList />
    </div>
  );
}

export default App;