const API_BASE_URL = "https://rooms-booking-backend-1.onrender.com/api";


const getAuthToken = () => {
  return localStorage.getItem('access_token');
};

const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const api = {
  get: (endpoint: string) => apiRequest(endpoint, { method: 'GET' }),
  post: (endpoint: string, data: unknown) =>
    apiRequest(endpoint, { method: 'POST', body: JSON.stringify(data) }),
  put: (endpoint: string, data: unknown) =>
    apiRequest(endpoint, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (endpoint: string) => apiRequest(endpoint, { method: 'DELETE' }),
};
