import React, { useState } from 'react';
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const SaveButton = styled.button`
  flex: 1;
  margin-right: 0.5rem;
`;

const CloseButton = styled.button`
  flex: 1;
  margin-left: 0.5rem;
`;

function MovieInfoPanel({ movie, onClose, onSave }) {
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');
  const [watched, setWatched] = useState(false);

  if (!movie) return null;

  const handleSave = () => {
    onSave({
      movieId: movie.imdbID,
      rating,
      comment,
      watched,
    });
  };


  return (
    <InfoPanel>
      {/* ... (movie info) ... */}
      <div>
        <label>Watched:</label>
        <input type="checkbox" checked={watched} onChange={(e) => setWatched(e.target.checked)}/>
      </div>

      <div>
        <label>Rating:</label>
        <input type="number" min="1" max="10" value={rating} onChange={(e) => setRating(parseInt(e.target.value))}/>
      </div>

      <div>
        <label>Comment:</label>
        <textarea value={comment} onChange={(e) => setComment(e.target.value)}/>
      </div>

      <ButtonContainer>
        <SaveButton onClick={handleSave}>Save</SaveButton>
        <CloseButton onClick={onClose}>Close</CloseButton>
      </ButtonContainer>
    </InfoPanel>
  );
}

export default MovieInfoPanel;