import { useState, useCallback } from "react";
import { authService } from "@/lib/auth";
import { useAuth } from "@/contexts/AuthContext";

interface ApiState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

interface UseAuthenticatedApiReturn<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  execute: (url: string, options?: RequestInit) => Promise<T>;
  reset: () => void;
}

export function useAuthenticatedApi<T = any>(): UseAuthenticatedApiReturn<T> {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    isLoading: false,
    error: null,
  });
  
  const { logout } = useAuth();

  const execute = useCallback(
    async (url: string, options: RequestInit = {}): Promise<T> => {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      try {
        const response = await authService.authenticatedFetch(url, options);
        
        if (!response.ok) {
          if (response.status === 401) {
            // Unauthorized - logout user
            await logout();
            throw new Error("Session expired. Please login again.");
          }
          
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setState(prev => ({ ...prev, data, isLoading: false }));
        return data;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
        setState(prev => ({ ...prev, error: errorMessage, isLoading: false }));
        throw error;
      }
    },
    [logout]
  );

  const reset = useCallback(() => {
    setState({ data: null, isLoading: false, error: null });
  }, []);

  return {
    data: state.data,
    isLoading: state.isLoading,
    error: state.error,
    execute,
    reset,
  };
}

// Convenience hooks for common HTTP methods
export function useAuthenticatedGet<T = any>() {
  const api = useAuthenticatedApi<T>();
  
  const get = useCallback(
    (url: string, options: RequestInit = {}) => {
      return api.execute(url, { ...options, method: "GET" });
    },
    [api]
  );

  return { ...api, get };
}

export function useAuthenticatedPost<T = any>() {
  const api = useAuthenticatedApi<T>();
  
  const post = useCallback(
    (url: string, data?: any, options: RequestInit = {}) => {
      return api.execute(url, {
        ...options,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        body: data ? JSON.stringify(data) : undefined,
      });
    },
    [api]
  );

  return { ...api, post };
}

export function useAuthenticatedPut<T = any>() {
  const api = useAuthenticatedApi<T>();
  
  const put = useCallback(
    (url: string, data?: any, options: RequestInit = {}) => {
      return api.execute(url, {
        ...options,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        body: data ? JSON.stringify(data) : undefined,
      });
    },
    [api]
  );

  return { ...api, put };
}

export function useAuthenticatedDelete<T = any>() {
  const api = useAuthenticatedApi<T>();
  
  const delete_ = useCallback(
    (url: string, options: RequestInit = {}) => {
      return api.execute(url, { ...options, method: "DELETE" });
    },
    [api]
  );

  return { ...api, delete: delete_ };
} 