import React, { useState } from 'react';
import type { Review } from '../../types/review';
import { ReviewCard } from '../ui/ReviewCard';
import { RatingStars } from '../ui/RatingStars';
import { Button } from '../ui/Button';
import styles from './Reviews.module.css';  // ← CAMBIAR a "./Reviews.module.css"

interface ReviewsProps {
  reviews: Review[];
  onAddReview?: (rating: number, comment: string) => void;
  onLike?: (id: string) => void;
  currentUserId?: string;
}

export const Reviews: React.FC<ReviewsProps> = ({
  reviews,
  onAddReview,
  onLike,
  currentUserId
}) => {
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const averageRating = reviews.length > 0
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
    : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating || !comment.trim()) return;

    setIsSubmitting(true);
    try {
      await onAddReview?.(rating, comment);
      setRating(0);
      setComment('');
      setShowForm(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="reviews" className={styles.reviews}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Reseñas de Clientes</h2>
          <p className={styles.subtitle}>
            Lo que nuestros clientes dicen sobre nosotros
          </p>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statValue}>{reviews.length}</span>
            <span className={styles.statLabel}>Reseñas</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>
              {averageRating.toFixed(1)}
            </span>
            <div className={styles.statStars}>
              <RatingStars rating={Math.round(averageRating)} size="lg" />
            </div>
          </div>
        </div>

        {currentUserId && (
          <div className={styles.addReview}>
            {!showForm ? (
              <Button
                variant="primary"
                onClick={() => setShowForm(true)}
                icon={<i className="fas fa-plus" />}
              >
                Escribir Reseña
              </Button>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                <h3 className={styles.formTitle}>Escribe tu reseña</h3>
                <div className={styles.formRating}>
                  <RatingStars
                    rating={rating}
                    size="lg"
                    interactive
                    onRate={setRating}
                  />
                </div>
                <textarea
                  className={styles.textarea}
                  placeholder="Comparte tu experiencia..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  required
                />
                <div className={styles.formButtons}>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowForm(false)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    loading={isSubmitting}
                    disabled={!rating || !comment.trim()}
                  >
                    Publicar
                  </Button>
                </div>
              </form>
            )}
          </div>
        )}

        <div className={styles.grid}>
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              onLike={onLike}
              currentUserId={currentUserId}
            />
          ))}
        </div>
      </div>
    </section>
  );
};