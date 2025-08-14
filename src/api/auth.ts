import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api"; // Change if your backend runs elsewhere

export async function signIn(emailOrMobile: string, password: string) {
  return axios.post(`${API_BASE_URL}/user/login`, { emailOrMobile, password });
}

export async function signUp(data: { name: string; email: string; password: string; mobile?: string }) {
  return axios.post(`${API_BASE_URL}/user/register`, data);
}