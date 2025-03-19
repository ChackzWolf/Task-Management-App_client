// src/services/api.ts
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface RequestOptions extends RequestInit {
  data?: any;
}

// Generic API request function
export const apiRequest = async (
  endpoint: string,
  method: string = 'GET',
  data: any = null,
  requiresAuth: boolean = true
): Promise<any> => {
  const url = `${API_URL}${endpoint}`;
  const options: RequestOptions = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (requiresAuth) {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Not authenticated');
    }
    options.headers = {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
    };
  }

  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);

  // Check if the response is JSON
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || 'Request failed');
    }

    return responseData;
  } else {
    if (!response.ok) {
      throw new Error('Request failed');
    }
    return response.text();
  }
};

// Utility methods for common HTTP methods
export const get = async (endpoint: string, requiresAuth: boolean = true): Promise<any> => {
  return apiRequest(endpoint, 'GET', null, requiresAuth);
};

export const post = async (endpoint: string, data: any, requiresAuth: boolean = true): Promise<any> => {
  return apiRequest(endpoint, 'POST', data, requiresAuth);
};

export const put = async (endpoint: string, data: any, requiresAuth: boolean = true): Promise<any> => {
  return apiRequest(endpoint, 'PUT', data, requiresAuth);
};

export const patch = async (endpoint: string, data: any, requiresAuth: boolean = true): Promise<any> => {
  return apiRequest(endpoint, 'PATCH', data, requiresAuth);
};

export const del = async (endpoint: string, requiresAuth: boolean = true): Promise<any> => {
  return apiRequest(endpoint, 'DELETE', null, requiresAuth);
};