import React, { createContext, useContext, useState, ReactNode } from 'react';
import { authApi } from '@/lib/api';
import { signUp } from '@/api/auth';

// Add this updated User interface
interface User {
  success?: boolean;
  message?: string;
  token?: string;
  user?: {
    user_id?: string;
    user_name?: string;
    user_email?: string;
    user_mobile?: string;
    user_avatar?: string; // Added this missing field
  };
  user_avatar?: string; // Allow for flat structure too
  user_name?: string;
  user_email?: string;
  user_mobile?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (userData: User) => void;
  login: (userData: User) => void; // <-- Add this line
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

  const fetchAndSetUser = async (token: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'}/user/profile`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      const result = await response.json();
      console.log(result)
      if (result.success) {
        setUser(result.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    }
  };

  const signIn = async (userData: User) => {
    const token = userData.token || "";
    localStorage.setItem('token', token);
    await fetchAndSetUser(token);
  };

  // Add login as an alias for signIn
  const login = signIn;

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("token");// Use the API signout method which removes the token
    authApi.signout();
  };

  // Then update the updateUser function to handle both nested and flat structures
  const updateUser = (userData: Partial<User>) => {
    if (user) {
      // Handle both flat and nested structures
      const updatedUser = { 
        ...user,
        // Update top-level properties
        ...userData,
        // Also update nested user properties if they exist
        user: user.user ? {
          ...user.user,
          ...(userData.user || {}),
          // If top-level properties are provided, also update them in the nested user
          user_avatar: userData.user_avatar || userData.user?.user_avatar || user.user.user_avatar,
          user_name: userData.user_name || userData.user?.user_name || user.user.user_name,
          user_email: userData.user_email || userData.user?.user_email || user.user.user_email,
          user_mobile: userData.user_mobile || userData.user?.user_mobile || user.user.user_mobile,
        } : undefined
      };
      
      setUser(updatedUser);
      console.log("Updated user:", updatedUser);
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
            console.log(result)
            if (result.success) {
              setUser(result.user);
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
    login,
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

