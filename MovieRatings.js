import React, { useState, useEffect } from 'react';
import RatingList from './RatingList';
import RatingForm from './RatingForm';
import MovieRatings from './MovieRatings';

function MovieDetails({ movieId }) {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRatings = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/movies/${movieId}/ratings`);
        if (response.ok) {
          const data = await response.json();
          setRatings(data);
        } else {
          setError('Failed to fetch ratings.');
        }
      } catch (err) {
        setError('Error fetching ratings.');
      }
      setLoading(false);
    };

    fetchRatings();
  }, [movieId]);

  if (loading) {
    return <p>Loading ratings...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <RatingList ratings={ratings} />
      <RatingForm movieId={movieId} setRatings={setRatings} />
      <MovieRatings movieId={movieId} />
    </div>
  );
}

export default MovieRatings;