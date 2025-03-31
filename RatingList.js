import React from 'react';

function RatingList({ ratings }) {
  return (
    <div>
      <h3>Ratings:</h3>
      {ratings.length === 0 ? (
        <p>No ratings yet.</p>
      ) : (
        <ul>
          {ratings.map((rating) => (
            <li key={rating.id}>
              Rating: {rating.rating}, Comment: {rating.comment}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RatingList;