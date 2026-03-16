import React from 'react';
import type { Review } from '../../types'; // Importación type-only
import { RatingStars } from './RatingStars';
import { Button } from './Button';
import styles from './ReviewCard.module.css';

interface ReviewCardProps {
  review: Review;
  onLike?: (id: string) => void;
  currentUserId?: string;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  onLike,
  currentUserId
}) => {
  const {
    id,
    userName,
    userPhoto,
    rating,
    comment,
    date,
    likes
  } = review;

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleLike = () => {
    onLike?.(id);
  };

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <div className={styles.user}>
          {userPhoto ? (
            <img 
              src={userPhoto} 
              alt={userName}
              className={styles.avatar}
            />
          ) : (
            <div className={styles.avatarPlaceholder}>
              {userName.charAt(0).toUpperCase()}
            </div>
          )}
          <div className={styles.userInfo}>
            <h4 className={styles.userName}>{userName}</h4>
            <RatingStars rating={rating} size="sm" />
          </div>
        </div>
        <time className={styles.date} dateTime={date.toString()}>
          {formatDate(date)}
        </time>
      </div>

      <p className={styles.comment}>{comment}</p>

      <div className={styles.footer}>
        <Button
          variant="outline"
          size="sm"
          icon={<i className={`fa${currentUserId ? 's' : 'r'} fa-heart`} />}
          onClick={handleLike}
          className={styles.likeButton}
        >
          {likes} {likes === 1 ? 'Me gusta' : 'Me gusta'}
        </Button>
      </div>
    </article>
  );
};