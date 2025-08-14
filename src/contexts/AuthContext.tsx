
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { authApi } from '@/lib/api';

interface User {
  id?: string;
  name: string;
  email: string;
  mobile?: string;
  countryCode?: string;
  isEmailVerified?: boolean;
  isMobileVerified?: boolean;
  avatar?: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (userData: User) => void;
  signOut: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const signIn = (userData: User) => {
    setUser(userData);
    // Store in localStorage for persistence (user data without token)
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const signOut = () => {
    setUser(null);
    // Use the API signout method which removes the token
    authApi.signout();
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  // Check for existing user on component mount
  React.useEffect(() => {
    const initializeAuth = async () => {
      const storedUser = localStorage.getItem('user');
      const token = localStorage.getItem('authToken');
      
      if (storedUser && token) {
        try {
          const userData = JSON.parse(storedUser);
          
          // Validate token by trying to fetch user profile
          try {
            // Try to fetch fresh user data from API
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'}/user/profile`, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            
            if (response.ok) {
              const result = await response.json();
              if (result.success && result.data?.user) {
                // Use fresh data from API
                setUser(result.data.user);
                localStorage.setItem('user', JSON.stringify(result.data.user));
              } else {
                // Fallback to stored user data
                setUser(userData);
              }
            } else {
              // Token might be invalid, but keep stored user data
              setUser(userData);
            }
          } catch (error) {
            console.log('Could not fetch fresh user data, using stored data');
            setUser(userData);
          }
        } catch (error) {
          console.error('Error parsing stored user data:', error);
          localStorage.removeItem('user');
          localStorage.removeItem('authToken');
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    signIn,
    signOut,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
