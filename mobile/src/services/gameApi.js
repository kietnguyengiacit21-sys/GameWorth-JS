import {apiRequest} from './api';

export function getGames() {
  return apiRequest(
    '/games'
  );
}
export function getGameById(gameId) {
  const path =
    '/games/' + gameId;
  return apiRequest(
    path
  );
}
export function getGameMedia(gameId) {
  const path =
    '/games/' +
    gameId +
    '/media';
  return apiRequest(
    path
  );
}