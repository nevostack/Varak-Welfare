
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { authApi } from '@/lib/api';
import { signUp } from '@/api/auth';

interface User {
  success?: boolean
  message?: string
  token?: string
  user?: {
    user_id?: string
    user_name?: string
    user_email?: string
    user_mobile?: string
  }
  avatar?: string
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
    localStorage.setItem('token', JSON.stringify(userData.token))
    // localStorage.setItem('user', JSON.stringify(userData));
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
      // localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  // Check for existing user on component mount
  React.useEffect(() => {
    const initializeAuth = async () => {
      // const storedUser = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          try {
            // Try to fetch fresh user data from API
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'}/user/profile`, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            
            const result = await response.json();
            if (result.status) {
              setUser(result.data);
            } else {
              // Token might be invalid, but keep stored user data
              setUser(null);
            }
          } catch (error) {
            console.log('Could not fetch fresh user data, using stored data');
            setUser(null);
          }
        } catch (error) {
          console.error('Error parsing stored user data:', error);
          localStorage.removeItem('token');
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
    signUp
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
