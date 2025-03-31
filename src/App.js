import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate
import ProtectedRoute from './ProtectedRoute';
import Home from './components/Home';
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
  font-family: sans-serif;
`;

function App() {
  return (
    <Router>
      <AppContainer>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/movies"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <SearchBar />
                  <SearchResults />
                  <WatchedMovieList />
                </>
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Home/>} />
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App;