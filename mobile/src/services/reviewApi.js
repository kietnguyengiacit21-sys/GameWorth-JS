import {apiRequest} from './api';


export function getGameReviews(gameId) {
  const path = '/games/' + gameId + '/reviews';
  return apiRequest(path);
}


export function getCommunityRating(gameId) {
  const path = '/games/' + gameId + '/reviews/summary';
  return apiRequest(path);
}


export function getReviewById(reviewId) {
  const path = '/reviews/' + reviewId;
  return apiRequest(path);
}


export function getMyReviews(token) {
  return apiRequest('/reviews/mine', {
    token: token,
  });
}


export function createReview(gameId, request, token) {
  const path = '/games/' + gameId + '/reviews';

  return apiRequest(path, {
    method: 'POST',
    token: token,
    body: JSON.stringify(request),
  });
}


export function updateReview(reviewId, request, token) {
  const path = '/reviews/' + reviewId;

  return apiRequest(path, {
    method: 'PUT',
    token: token,
    body: JSON.stringify(request),
  });
}


export function deleteReview(reviewId, token) {
  const path = '/reviews/' + reviewId;

  return apiRequest(path, {
    method: 'DELETE',
    token: token,
  });
}