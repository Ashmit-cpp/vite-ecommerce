// Environment configuration
export const config = {
  // API Configuration
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
    timeout: 30000, // 30 seconds
  },

  // Authentication Configuration
  auth: {
    tokenKey: "JWT",
    refreshTokenKey: "refreshToken",
    tokenRefreshThreshold: 5 * 60 * 1000, // Refresh token if it expires in 5 minutes
  },

  // Application Configuration
  app: {
    name: "E-Commerce App",
    version: "1.0.0",
    environment: import.meta.env.MODE || "development",
  },
} as const;

// Type-safe environment variables
export type Config = typeof config; 