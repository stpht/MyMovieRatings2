import React from 'react';
import styled from 'styled-components';

const InfoPanel = styled.div`
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 1rem;
  margin: 2rem auto;
  width: 400px;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

function MovieInfoPanel({ movie }) {
  if (!movie) return null;

  return (
    <InfoPanel>
      <h2>{movie.Title}</h2>
      <p>Year: {movie.Year}</p>
      <p>Director: {movie.Director}</p>
      {/* Add more movie info here */}

      <div>
        <label>Watched:</label>
        <input type="checkbox" />
      </div>

      <div>
        <label>Rating:</label>
        <input type="number" min="1" max="10" />
      </div>

      <div>
        <label>Comment:</label>
        <textarea />
      </div>
    </InfoPanel>
  );
}

export default MovieInfoPanel;