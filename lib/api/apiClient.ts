/**
 * Centralized API client for all backend requests
 * Handles auth, error handling, and consistent configuration
 */

export const API_BASE =
  process.env.NEXT_PUBLIC_API || "http://localhost:5000/api";

type RequestOptions = RequestInit & {
  throwError?: boolean;
};

export async function apiCall<T = any>(
  endpoint: string,
  options?: RequestOptions
): Promise<T> {
  const { throwError = true, ...fetchOptions } = options || {};

  const url = `${API_BASE}${endpoint}`;

  try {
    const response = await fetch(url, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...fetchOptions.headers,
      },
      ...fetchOptions,
    });

    const data = await response.json();

    if (!response.ok) {
      const error = new Error(
        data.message || `API Error: ${response.status}`
      );
      if (throwError) throw error;
      return data;
    }

    return data;
  } catch (error) {
    console.error(`API call failed: ${endpoint}`, error);
    if (throwError) throw error;
    return null as any;
  }
}

// Convenience methods
export const api = {
  get: <T = any>(endpoint: string, options?: RequestOptions) =>
    apiCall<T>(endpoint, { ...options, method: "GET" }),

  post: <T = any>(endpoint: string, body?: any, options?: RequestOptions) =>
    apiCall<T>(endpoint, {
      ...options,
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    }),

  put: <T = any>(endpoint: string, body?: any, options?: RequestOptions) =>
    apiCall<T>(endpoint, {
      ...options,
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    }),

  delete: <T = any>(endpoint: string, options?: RequestOptions) =>
    apiCall<T>(endpoint, { ...options, method: "DELETE" }),
};
