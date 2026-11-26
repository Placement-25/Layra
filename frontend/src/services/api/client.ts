export interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!res.ok) {
      return {
        success: false,
        error: `HTTP error ${res.status}: ${res.statusText}`,
      };
    }

    const data = await res.json();
    return { data, success: true };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'Network request failed. Ensure backend server is running.',
    };
  }
}
