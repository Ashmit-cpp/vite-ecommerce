import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  token: string | null;
  login: (accessToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("JWT")
  );

  const login = (accessToken: string) => {
    localStorage.setItem("JWT", accessToken);
    setToken(accessToken);
  };

  const logout = () => {
    localStorage.removeItem("JWT");
    window.location.href = "/";
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
