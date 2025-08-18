const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

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
  user_name: string;
  user_email: string;
  user_mobile: string;
  countryCode?: string;
  user_password: string;
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
    this.name = "ApiError";
  }
}

const handleApiResponse = async (response: Response): Promise<ApiResponse> => {
  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(
      data.message || "An error occurred",
      response.status,
      data
    );
  }

  return data;
};

interface RequestOptions extends RequestInit {
  headers?: Record<string, string>;
}

const makeApiRequest = async (
  endpoint: string,
  options: RequestOptions = {}
): Promise<ApiResponse> => {
  const url = `${API_BASE_URL}${endpoint}`;

  const config: RequestOptions = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  // Add auth token if available
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers!["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, config);
    return await handleApiResponse(response);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    // Network or other errors
    throw new ApiError("Network error. Please check your connection.", 0, {
      originalError: (error as Error).message,
    });
  }
};

// Auth API functions
export const authApi = {
  // Sign up new user
  signup: async (userData: SignupData): Promise<ApiResponse<AuthResponse>> => {
    const response = await makeApiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });

    // Store token if signup successful
    if (response.data?.token) {
      localStorage.setItem("authToken", response.data.token);
    }

    return response;
  },

  signin: async (credentials: {
    user_email?: string;
    user_mobile?: string;
    user_password?: string;
    otp?: string;
  }) => {
    const response = await makeApiRequest("/user/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    // if (response?.jwt) {
    //   localStorage.setItem('token', response.jwt);
    // }
    return response;
  },

  // Request OTP for email
  requestOTPEmail: async (user_email: string) => {
    return await makeApiRequest("/user/request-otp", {
      method: "POST",
      body: JSON.stringify({ user_email }),
    });
  },

  // Request OTP for mobile (empty function for now)
  requestOTPMobile: async (_user_mobile: string) => {
    // TODO: Implement mobile OTP API when available
    return Promise.resolve();
  },

  // Verify OTP
  verifyOTP: async (
    identifier: { user_email?: string; user_mobile?: string },
    otp: string
  ) => {
    return await makeApiRequest("/user/verify-otp", {
      method: "POST",
      body: JSON.stringify({ ...identifier, otp }),
    });
  },

  // Sign out user
  signout: (): void => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  },
};

// User API functions
export const userApi = {
  // Get user profile
  getProfile: async (): Promise<ApiResponse<{ user: User }>> => {
    return await makeApiRequest("/user/profile");
  },

  // Update user profile
  update: async (credentials: {
    user_email?: string;
    user_mobile?: string;
    user_password?: string;
    pan_details?: string;
    gender?: "MALE" | "FEMALE" | "OTHER";
    date_of_birth?: Date;
    occupation?: "SALARIED" | "UNEMPLOYED" | "STUDENT";
    education?: "HIGH_SCHOOL" | "BACHELORS" | "MASTERS";
    address?: string;
  }) => {
    const response = await makeApiRequest("/user/update", {
      method: "PUT",
      body: JSON.stringify(credentials),
    });
    // if (response?.jwt) {
    //   localStorage.setItem('token', response.jwt);
    // }
    return response;
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
    return mobileRegex.test(mobile.replace(/\s+/g, ""));
  },

  isValidPassword: (password: string): boolean => {
    return typeof password === "string" && password.length >= 6;
  },

  validateSignupData: (data: SignupData) => {
    const errors: ValidationErrors = {};

    if (!data.user_name || data.user_name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters long";
    }

    if (!validators.isEmail(data.user_email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!validators.isMobile(data.user_mobile)) {
      errors.mobile = "Please enter a valid 10-digit mobile number";
    }

    if (!validators.isValidPassword(data.user_password)) {
      errors.password = "Password must be at least 6 characters long";
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  },

  validateSigninData: (data: SigninData) => {
    const errors: ValidationErrors = {};

    if (!data.identifier || data.identifier.trim().length === 0) {
      errors.identifier = "Please enter your email or mobile number";
    } else if (
      !validators.isEmail(data.identifier) &&
      !validators.isMobile(data.identifier)
    ) {
      errors.identifier = "Please enter a valid email address or mobile number";
    }

    if (!data.password || data.password.length === 0) {
      errors.password = "Please enter your password";
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  },
};

export { ApiError };
export type { User, AuthResponse, SignupData, SigninData, ValidationErrors };
