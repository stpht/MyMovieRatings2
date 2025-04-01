import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useAuthStore from '../store/useAuthStore';

// ... (styled components) ...

function MovieInfoPanel({ movie, onClose, onSave }) {
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');
  const [watched, setWatched] = useState(false);
  const token = useAuthStore((state) => state.token);
  const userId = useAuthStore((state) => state.user?.id);

  useEffect(() => {
    const fetchRatingData = async () => {
      if (movie && userId && token) {
        try {
          const response = await fetch(`/api/movies/${movie.imdbID}/ratings`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const ratings = await response.json();
            const userRating = ratings.find((r) => r.user_id === userId);

            if (userRating) {
              setRating(userRating.rating);
              setComment(userRating.comment);
              setWatched(userRating.watched);
            } else {
              setRating(1);
              setComment('');
              setWatched(false);
            }
          } else {
            console.error('Error fetching rating data:', response.status);
            setRating(1);
            setComment('');
            setWatched(false);
          }
        } catch (error) {
          console.error('Error fetching rating data:', error);
          setRating(1);
          setComment('');
          setWatched(false);
        }
      } else {
        setRating(1);
        setComment('');
        setWatched(false);
      }
    };

    fetchRatingData();
  }, [movie, userId, token]);

  if (!movie) return null;

  const handleSave = async () => {
    try {
      const response = await fetch('/api/ratings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_id: userId,
          movie_id: movie.imdbID,
          rating,
          comment,
          watched,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Movie rating saved:', data);
      onSave(data);
      onClose();
    } catch (error) {
      console.error('Error saving movie rating:', error);
      onClose();
    }
  };

  return (
    <InfoPanel>
      <h2>{movie.Title}</h2>
      <p>Year: {movie.Year}</p>
      <p>Director: {movie.Director}</p>

      <div>
        <label>Watched:</label>
        <input type="checkbox" checked={watched} onChange={(e) => setWatched(e.target.checked)} />
      </div>

      <div>
        <label>Rating:</label>
        <input type="number" min="1" max="10" value={rating} onChange={(e) => setRating(parseInt(e.target.value))} />
      </div>

      <div>
        <label>Comment:</label>
        <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
      </div>

      <ButtonContainer>
        <SaveButton onClick={handleSave}>Save</SaveButton>
        <CloseButton onClick={onClose}>Close</CloseButton>
      </ButtonContainer>
    </InfoPanel>
  );
}

export default MovieInfoPanel;