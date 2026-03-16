import React, { useState } from 'react';
import styles from './RatingStars.module.css';

interface RatingStarsProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onRate?: (rating: number) => void;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  size = 'md',
  interactive = false,
  onRate
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseEnter = (index: number) => {
    if (interactive) {
      setHoverRating(index);
    }
  };

  const handleMouseLeave = () => {
    if (interactive) {
      setHoverRating(0);
    }
  };

  const handleClick = (index: number) => {
    if (interactive && onRate) {
      onRate(index);
    }
  };

  const starClasses = (index: number) => {
    const isFilled = index <= (hoverRating || rating);
    return [
      styles.star,
      styles[size],
      isFilled ? styles.filled : styles.empty,
      interactive ? styles.interactive : ''
    ].filter(Boolean).join(' ');
  };

  return (
    <div className={styles.container}>
      {[1, 2, 3, 4, 5].map((index) => (
        <i
          key={index}
          className={`${starClasses(index)} fa${index <= (hoverRating || rating) ? 's' : 'r'} fa-star`}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(index)}
          role={interactive ? 'button' : 'presentation'}
          aria-label={interactive ? `Calificar ${index} estrellas` : undefined}
        />
      ))}
    </div>
  );
};