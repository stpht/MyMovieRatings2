import React from 'react';
import styled from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import Login from './components/Login';
import Register from './components/Register';
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
    <AppContainer>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/movies" element={
          <>
            <Header />
            <SearchBar />
            <SearchResults />
            <WatchedMovieList />
          </>
        } />
      </Routes>
    </AppContainer>
  );
}

export default App;