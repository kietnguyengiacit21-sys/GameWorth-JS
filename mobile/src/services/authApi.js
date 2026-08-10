import {apiRequest} from './api';

export function login(request) {
  return apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(request),
  });
}

export function register(request) {
  return apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify(request),
  });
}
