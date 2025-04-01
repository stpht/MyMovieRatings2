import React, { useState } from 'react';
import styled from 'styled-components';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Login from './components/Login';
import Register from './components/Register';
import WatchedMovieList from './components/WatchedMovieList';
import SearchBar from './components/SearchBar';
import MovieInfoPanel from './components/MovieInfoPanel';
import useAuthStore from './store/useAuthStore';
import GlobalStyle from './GlobalStyles';

const Title = styled.h1`
  text-align: center;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchBarContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WatchedListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  text-align: center;
`;

const BottomPanelsContainer = styled.div`
  flex: 2;
  display: flex;
`;

const TopRatedPanel = styled.div`
  flex: 1;
  margin: 1rem;
  padding: 1rem;
  background: rgba(220, 248, 255, 0.1);
  border-radius: 10px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const WorstRatedPanel = styled.div`
  flex: 1;
  margin: 1rem;
  padding: 1rem;
  background: rgba(255, 220, 240, 0.1);
  border-radius: 10px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseMovieInfo = () => {
    setSelectedMovie(null);
  };

  const handleSaveMovie = (movieData) => {
    // Save movieData to your database
    console.log('Saving movie data:', movieData);
    setSelectedMovie(null); // Close the panel after saving
  };

  const handleQueryChange = () => {
    setSelectedMovie(null); // Clear selectedMovie when query changes
  };

  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/movies"
          element={
            <ProtectedRoute>
              <>
                <Title>MyMovieRatings2</Title>
                <SearchBarContainer>
                  <SearchBar onSelect={handleMovieSelect} />
                </SearchBarContainer>
                <WatchedListContainer>
                  <WatchedMovieList />
                </WatchedListContainer>
                <BottomPanelsContainer>
                  <TopRatedPanel>Top Rated</TopRatedPanel>
                  <WorstRatedPanel>Worst Rated</WorstRatedPanel>
                </BottomPanelsContainer>
                <SearchBar onSelect={handleMovieSelect} onQueryChange={handleQueryChange}/>
                <MovieInfoPanel movie={selectedMovie} onClose={handleCloseMovieInfo} onSave={handleSaveMovie} />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/movies" /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
}

export default App;