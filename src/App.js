import React from 'react';
import styled from 'styled-components';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Home from './components/Home'; // Assuming Home.js is your app page
import Login from './components/Login';
import Register from './components/Register';
import Header from './components/Header';
import WatchedMovieList from './components/WatchedMovieList';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import useAuthStore from './store/useAuthStore'; // Import useAuthStore

const AppContainer = styled.div`
  background: linear-gradient(to bottom, #222, #333);
  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Center vertically */
  font-family: sans-serif;
`;

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
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
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/movies" /> : <Navigate to="/login" />}
        />
      </Routes>
    </AppContainer>
  );
}

export default App;