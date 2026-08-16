export const API_BASE_URL = 'http://10.0.2.2:8080/api';

export async function apiRequest(path, options = {}) {
  const {token, ...fetchOptions} = options;
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...fetchOptions,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? {Authorization: `Bearer ${token}`} : {}),
      ...fetchOptions.headers,
    },
  });

  const text = await response.text().catch(() => '');
  if (!response.ok) {
    let message = text || `HTTP ${response.status}`;

    try {
      const json = JSON.parse(text);
      if (json?.message) {
        message = json.message;
      }
    } catch (error) {
      // ignore non-JSON error content
    }

    throw new Error(message);
  }

  if (response.status === 204 || !text) {
    return;
  }

  return JSON.parse(text);
}
