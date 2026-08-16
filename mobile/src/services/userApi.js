import {apiRequest} from './api';

export function getMe(token) {
  return apiRequest('/users/me', {
    method: 'GET',
    token,
  });
}

export function updateMe(request, token) {
  return apiRequest('/users/me', {
    method: 'PUT',
    body: JSON.stringify(request),
    token,
  });
}

