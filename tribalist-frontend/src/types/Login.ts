export interface LoginRequest {
  email: string;
  password: string;
  role: 'Customer' | 'Seller';
}

export interface LoginResponse {
  token: string;
  role: string;
  userId: number;
}
