import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { authService, AuthResponse } from "@/lib/auth";

interface User {
  id: number;
  email: string;
  username?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize authentication state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const accessToken = authService.getAccessToken();
        
        if (accessToken && authService.isTokenValid(accessToken)) {
          setToken(accessToken);
          const userData = authService.getUserFromToken();
          setUser(userData);
        } else {
          // Try to refresh token
          const newToken = await authService.refreshAccessToken();
          if (newToken) {
            setToken(newToken);
            const userData = authService.getUserFromToken();
            setUser(userData);
          } else {
            // Clear invalid tokens
            authService.clearTokens();
          }
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        authService.clearTokens();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const authResponse: AuthResponse = await authService.login(email, password);
      
      setToken(authResponse.accessToken);
      setUser(authResponse.user);
      
      // Redirect to intended page or home
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Login failed";
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true);
      await authService.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setToken(null);
      setUser(null);
      setError(null);
      setIsLoading(false);
      navigate("/", { replace: true });
    }
  };

  const refreshUser = async (): Promise<void> => {
    try {
      const userData = authService.getUserFromToken();
      setUser(userData);
    } catch (error) {
      console.error("Failed to refresh user data:", error);
      await logout();
    }
  };

  const clearError = (): void => {
    setError(null);
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!user && !!token && authService.isAuthenticated(),
    isLoading,
    error,
    login,
    logout,
    clearError,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
