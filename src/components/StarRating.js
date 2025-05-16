import React from 'react';
import '../Style/StarRating.css';

const StarRating = ({ rating }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  // Generate full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <span key={`star-${i}`} className="star filled">
        ★
      </span>
    );
  }

  // Add half star if needed
  if (hasHalfStar) {
    stars.push(
      <span key="star-half" className="star half">
        ★
      </span>
    );
  }

  // Add empty stars
  while (stars.length < 5) {
    stars.push(
      <span key={`star-empty-${stars.length}`} className="star">
        ☆
      </span>
    );
  }

  return <div className="star-rating">{stars}</div>;
};

export default StarRating; 