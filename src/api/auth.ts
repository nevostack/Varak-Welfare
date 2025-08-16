import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api"; // Change if your backend runs elsewhere

export async function signIn(emailOrMobile: string, password?: string, otp?: string) {
  return axios.post(`${API_BASE_URL}/user/login`, { emailOrMobile, password, otp });
}

export async function signUp(data: { user_name: string; user_email: string; user_password: string; user_mobile?: string }) {
  return axios.post(`${API_BASE_URL}/user/register`, data);
}