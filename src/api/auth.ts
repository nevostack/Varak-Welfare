import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api"; // Change if your backend runs elsewhere

export async function signIn(
  user_email?: string,
  user_password?: string,
  user_mobile?: string,
  otp?: string
) {
  return await axios.post(`${API_BASE_URL}/user/login`, {
    user_email,
    user_password,
    user_mobile,
    otp,
  });
}

export async function signUp(data: {
  user_name: string;
  user_email: string;
  user_password: string;
  user_mobile?: string;
}) {
  return await axios.post(`${API_BASE_URL}/user/register`, data);
}

export async function requestOTPEmail(email: string) {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/request-otp`, {
      user_email: email,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // Return the error response from the server
      return error.response.data;
    }
    throw error;
  }
}

// Similarly for register OTP request
export async function requestRegisterOTP(email: string) {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/user/register-request-otp`,
      {
        user_email: email,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // Return the error response from the server
      return error.response.data;
    }
    throw error;
  }
}
