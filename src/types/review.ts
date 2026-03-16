export interface Review {
  id: string;
  userId: string;
  userName: string;
  userPhoto?: string;
  rating: number;
  comment: string;
  date: Date;
  likes: number;
}

export interface CreateReviewDTO {
  rating: number;
  comment: string;
}