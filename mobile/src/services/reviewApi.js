import {apiRequest} from './api';

export function getGameReviews(gameId) {
  return apiRequest(`/games/${gameId}/reviews`);
}

export function getReviewById(reviewId) {
  return apiRequest(`/reviews/${reviewId}`);
}

export function createReview(gameId, request) {
  return apiRequest(`/games/${gameId}/reviews`, {
    method: 'POST',
    body: JSON.stringify(request),
  });
}

export function updateReview(reviewId, request) {
  return apiRequest(`/reviews/${reviewId}`, {
    method: 'PUT',
    body: JSON.stringify(request),
  });
}

export function deleteReview(reviewId) {
  return apiRequest(`/reviews/${reviewId}`, {
    method: 'DELETE',
  });
}

export function getMyReviews() {
  return apiRequest('/users/me/reviews');
}
