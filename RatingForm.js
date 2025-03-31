import React, { useState } from 'react';

function RatingForm({ movieId, setRatings }) {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/ratings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          //'Authorization': `Bearer ${localStorage.getItem('token')}`, // If you have authorization
        },
        body: JSON.stringify({
          movie_id: movieId,
          rating: parseInt(rating), // Convert rating to integer
          comment: comment,
          user_id: 1, // Replace with the current user's ID (or get it from context/local storage)
        }),
      });

      if (response.ok) {
        const newRating = await response.json();
        setRatings((prevRatings) => [...prevRatings, newRating]);
        setRating(''); // Reset form fields
        setComment('');
      } else {
        console.error('Failed to add rating');
        // Handle error (e.g., show an error message)
      }
    } catch (error) {
      console.error('Error adding rating:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div>
      <h3>Add a Rating:</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="rating">Rating (1-5):</label>
          <input
            type="number"
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="1"
            max="5"
            required
          />
        </div>
        <div>
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button type="submit">Submit Rating</button>
      </form>
    </div>
  );
}

export default RatingForm;