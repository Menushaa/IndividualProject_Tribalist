import axios from 'axios';
import { Customer, Seller } from '../types/User';
import { LoginRequest, LoginResponse } from '../types/Login';
import { DashboardData } from '../types/Dashboard';

const API_BASE = 'https://localhost:7139/api'; // Change this!

export const registerCustomer = async (data: Customer) => {
  const response = await axios.post(`${API_BASE}/Customer/Register`, data);
  return response.data;
};
export const registerSeller = async (data: Seller) => {
  const response = await axios.post(`${API_BASE}/Seller/Create`, data);
  return response.data;
};

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const endpoint =
    data.role === 'Customer'
      ? `${API_BASE}/customer/login`
      : `${API_BASE}/seller/login`;

  const response = await axios.post(endpoint, {
    email: data.email,
    password: data.password,
  });

  return response.data;
};


export const sendForgotPasswordEmail = async (email: string) => {
  return axios.post(`${API_BASE}/Password/forgot`, { email });
};

export const verifyOtp = async (verificationCode: string) => {
  return axios.post(`${API_BASE}/Password/verify-otp`, { verificationCode });
};

export const resetPassword = async (newPassword: string) => {
  return axios.post(`${API_BASE}/Password/reset`, { newPassword });
};

export const getSellerDashboard = async (sellerId: number) => {
  const response = await axios.get<DashboardData>(`${API_BASE}/Seller/Dashboard/${sellerId}`);
  return response.data;
};