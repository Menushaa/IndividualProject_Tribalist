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

export const getSellerProfile = async (id: number) => {
  const response = await axios.get(`${API_BASE}/Seller/Details/${id}`);
  return response.data;
};

export const updateSellerProfile = async (id: number, data: FormData) => {
  const response = await axios.put(`${API_BASE}/Seller/ProfileUpdate/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const getSellerItems = async (sellerId: number) => {
  const res = await axios.get(`${API_BASE}/Item/GetItem${sellerId}`);
  return res.data;
};

export const addSellerItem = async (item: any) => {
  const res = await axios.post(`${API_BASE}/Item/CreateItem`, item);
  return res.data;
};

export const updateSellerItem = async (item: any) => {
  const res = await axios.put(`${API_BASE}//Item/Update${item.id}`, item);
  return res.data;
};

export const deleteSellerItem = async (id: number) => {
  const res = await axios.delete(`${API_BASE}/Item/Delete/${id}`);
  return res.data;
};