import { jwtDecode } from "jwt-decode";
import { config } from "./config";

interface DecodedToken {
  sub: number;
  email: string;
  iat: number;
  exp: number;
}

interface User {
  id: number;
  email: string;
  username?: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken?: string;
  user: User;
}

// Token storage keys
const ACCESS_TOKEN_KEY = config.auth.tokenKey;
const REFRESH_TOKEN_KEY = config.auth.refreshTokenKey;

export class AuthService {
  private static instance: AuthService;
  
  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  // Token management
  getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }

  setTokens(accessToken: string, refreshToken?: string): void {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    if (refreshToken) {
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    }
  }

  clearTokens(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }

  // Token validation
  isTokenValid(token: string): boolean {
    try {
      const decoded: DecodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp > currentTime;
    } catch {
      return false;
    }
  }

  isAuthenticated(): boolean {
    const token = this.getAccessToken();
    return token ? this.isTokenValid(token) : false;
  }

  // Get user info from token
  getUserFromToken(): User | null {
    const token = this.getAccessToken();
    if (!token || !this.isTokenValid(token)) {
      return null;
    }

    try {
      const decoded: DecodedToken = jwtDecode(token);
      return {
        id: decoded.sub,
        email: decoded.email,
      };
    } catch {
      return null;
    }
  }

  // Token refresh
  async refreshAccessToken(): Promise<string | null> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      return null;
    }

    try {
      const response = await fetch(`${this.getApiUrl()}/auth-integration/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        this.setTokens(data.accessToken, data.refreshToken);
        return data.accessToken;
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
    }

    return null;
  }

  // API calls with automatic token refresh
  async authenticatedFetch(url: string, options: RequestInit = {}): Promise<Response> {
    let token = this.getAccessToken();

    // Check if token is valid, try to refresh if not
    if (!token || !this.isTokenValid(token)) {
      token = await this.refreshAccessToken();
      if (!token) {
        throw new Error("Authentication required");
      }
    }

    const authenticatedOptions: RequestInit = {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, authenticatedOptions);

    // If we get 401, try to refresh token once
    if (response.status === 401) {
      const newToken = await this.refreshAccessToken();
      if (newToken) {
        authenticatedOptions.headers = {
          ...authenticatedOptions.headers,
          Authorization: `Bearer ${newToken}`,
        };
        return fetch(url, authenticatedOptions);
      }
    }

    return response;
  }

  private getApiUrl(): string {
    return config.api.baseUrl;
  }

  // Login method
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${this.getApiUrl()}/auth-integration/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Login failed");
    }

    const data = await response.json();
    this.setTokens(data.accessToken, data.refreshToken);
    
    return {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      user: this.getUserFromToken()!,
    };
  }

  // Logout method
  async logout(): Promise<void> {
    const refreshToken = this.getRefreshToken();
    
    // Optional: Call logout endpoint to invalidate tokens on server
    if (refreshToken) {
      try {
        await fetch(`${this.getApiUrl()}/auth-integration/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
        });
      } catch (error) {
        console.error("Logout API call failed:", error);
      }
    }

    this.clearTokens();
  }
}

export const authService = AuthService.getInstance(); 