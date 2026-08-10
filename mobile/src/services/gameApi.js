import {apiRequest} from './api';

export function getGames() {
  return apiRequest('/games');
}

export function getGameById(gameId) {
  return apiRequest(`/games/${gameId}`);
}
