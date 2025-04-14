
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";

interface User {
  email: string;
  username: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  signup: (email: string, password: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  // Check localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = (email: string, password: string) => {
    if (email && password) {
      setUser({ email, username: email.split('@')[0] });
      localStorage.setItem('user', JSON.stringify({ email, username: email.split('@')[0] }));
      toast.success("Login successful!");
      navigate('/threats');
    }
  };

  const signup = (email: string, password: string) => {
    if (email && password) {
      // In a real app, you would create a new user in your database
      // For this demo, we'll just store the user in localStorage
      setUser({ email, username: email.split('@')[0] });
      localStorage.setItem('user', JSON.stringify({ email, username: email.split('@')[0] }));
      toast.success("Account created successfully!");
      navigate('/threats');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
    toast.info("Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
