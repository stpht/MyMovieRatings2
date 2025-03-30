import React from 'react';
import styled from 'styled-components';
import Login from './components/Login';
import Header from './components/Header';
import WatchedMovieList from './components/WatchedMovieList';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults'; 

const AppContainer = styled.div`
  background: linear-gradient(to bottom, #222, #333);
  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: sans-serif;
`;

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