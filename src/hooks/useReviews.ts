import { useState, useEffect } from 'react';
import type { Review } from '../types'; // Solo importamos Review
 // Solo importamos Review

interface UseReviewsReturn {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  loading: boolean;
  error: string | null;
  addReview: (rating: number, comment: string) => Promise<void>;
  likeReview: (reviewId: string) => Promise<void>;
}

export const useReviews = (): UseReviewsReturn => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      // Datos de ejemplo
      const mockReviews: Review[] = [
        {
          id: '1',
          userId: 'user1',
          userName: 'María González',
          rating: 5,
          comment: 'Los mejores hot cakes que he probado. La atención es excelente y todo está delicioso.',
          date: new Date('2024-01-15'),
          likes: 12
        },
        {
          id: '2',
          userId: 'user2',
          userName: 'Carlos Rodríguez',
          rating: 4,
          comment: 'Muy buen lugar para desayunar. Los chilaquiles están espectaculares.',
          date: new Date('2024-01-10'),
          likes: 8
        },
        {
          id: '3',
          userId: 'user3',
          userName: 'Ana Martínez',
          rating: 5,
          comment: 'El ambiente es muy acogedor y la comida es casera como en casa.',
          date: new Date('2024-01-05'),
          likes: 15
        }
      ];
      setReviews(mockReviews);
    } catch (err) {
      setError('Error al cargar las reseñas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const averageRating = reviews.length > 0
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
    : 0;

  const addReview = async (rating: number, comment: string) => {
    try {
      setLoading(true);
      // Aquí iría la llamada a Firebase
      const newReview: Review = {
        id: Date.now().toString(),
        userId: 'current-user',
        userName: 'Usuario Actual',
        rating,
        comment,
        date: new Date(),
        likes: 0
      };
      setReviews(prev => [newReview, ...prev]);
    } catch (err) {
      setError('Error al agregar la reseña');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const likeReview = async (reviewId: string) => {
    setReviews(prev =>
      prev.map(review =>
        review.id === reviewId
          ? { ...review, likes: review.likes + 1 }
          : review
      )
    );
  };

  return {
    reviews,
    averageRating,
    totalReviews: reviews.length,
    loading,
    error,
    addReview,
    likeReview
  };
};