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

export function verifyRegistration(request) {
  return apiRequest('/auth/verify-register', {
    method: 'POST',
    body: JSON.stringify(request),
  });
}

export function forgotPassword(request) {
  return apiRequest('/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify(request),
  });
}

export function resetPassword(request) {
  return apiRequest('/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify(request),
  });
}
