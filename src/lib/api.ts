const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Types
interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
  countryCode: string;
  isEmailVerified: boolean;
  isMobileVerified: boolean;
  avatar?: string;
  role?: string;
  createdAt?: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

interface SignupData {
  name: string;
  email: string;
  mobile: string;
  countryCode?: string;
  password: string;
  confirmPassword: string;
}

interface SigninData {
  identifier: string;
  password: string;
}

interface ValidationErrors {
  [key: string]: string;
}

// API utility functions
class ApiError extends Error {
  public status: number;
  public data: any;

  constructor(message: string, status: number, data: any = null) {
    super(message);
    this.status = status;
    this.data = data;
    this.name = 'ApiError';
  }
}

const handleApiResponse = async (response: Response): Promise<ApiResponse> => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new ApiError(
      data.message || 'An error occurred',
      response.status,
      data
    );
  }
  
  return data;
};

interface RequestOptions extends RequestInit {
  headers?: Record<string, string>;
}

const makeApiRequest = async (endpoint: string, options: RequestOptions = {}): Promise<ApiResponse> => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Add auth token if available
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers!['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, config);
    return await handleApiResponse(response);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Network or other errors
    throw new ApiError(
      'Network error. Please check your connection.',
      0,
      { originalError: (error as Error).message }
    );
  }
};

// Auth API functions
export const authApi = {
  // Sign up new user
  signup: async (userData: SignupData): Promise<ApiResponse<AuthResponse>> => {
    const response = await makeApiRequest('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    // Store token if signup successful
    if (response.data?.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    
    return response;
  },

  // Sign in user
  signin: async (credentials: SigninData): Promise<ApiResponse<AuthResponse>> => {
    const response = await makeApiRequest('/auth/signin', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    // Store token if signin successful
    if (response.data?.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    
    return response;
  },

  // Request OTP for email or mobile verification
  requestOTP: async (identifier: string): Promise<ApiResponse> => {
    return await makeApiRequest('/auth/request-otp', {
      method: 'POST',
      body: JSON.stringify({ identifier }),
    });
  },

  // Verify OTP
  verifyOTP: async (identifier: string, otp: string): Promise<ApiResponse<AuthResponse>> => {
    const response = await makeApiRequest('/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ identifier, otp }),
    });
    
    // Store token if verification successful
    if (response.data?.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    
    return response;
  },

  // Sign out user
  signout: (): void => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },
};

// User API functions
export const userApi = {
  // Get user profile
  getProfile: async (): Promise<ApiResponse<{ user: User }>> => {
    return await makeApiRequest('/user/profile');
  },

  // Update user profile
  updateProfile: async (profileData: Partial<User>): Promise<ApiResponse<{ user: User }>> => {
    return await makeApiRequest('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },
};

// Validation helpers
export const validators = {
  isEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  isMobile: (mobile: string): boolean => {
    const mobileRegex = /^\d{10}$/;
    return mobileRegex.test(mobile.replace(/\s+/g, ''));
  },

  isValidPassword: (password: string): boolean => {
    return password && password.length >= 6;
  },

  validateSignupData: (data: SignupData) => {
    const errors: ValidationErrors = {};
    
    if (!data.name || data.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters long';
    }
    
    if (!validators.isEmail(data.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!validators.isMobile(data.mobile)) {
      errors.mobile = 'Please enter a valid 10-digit mobile number';
    }
    
    if (!validators.isValidPassword(data.password)) {
      errors.password = 'Password must be at least 6 characters long';
    }
    
    if (data.password !== data.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  },

  validateSigninData: (data: SigninData) => {
    const errors: ValidationErrors = {};
    
    if (!data.identifier || data.identifier.trim().length === 0) {
      errors.identifier = 'Please enter your email or mobile number';
    } else if (!validators.isEmail(data.identifier) && !validators.isMobile(data.identifier)) {
      errors.identifier = 'Please enter a valid email address or mobile number';
    }
    
    if (!data.password || data.password.length === 0) {
      errors.password = 'Please enter your password';
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
};

export { ApiError };
export type { User, AuthResponse, SignupData, SigninData, ValidationErrors };
