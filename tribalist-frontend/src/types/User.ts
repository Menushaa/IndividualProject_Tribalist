// types/User.ts

export interface BaseUser {
  name: string;
  email: string;
  password: string;
  address: string;
  role: 'Customer' | 'Seller' | 'Admin';
}

// Customer-specific fields
export interface Customer extends BaseUser {
  phone: string;
  city: string;
}

// Seller-specific fields
export interface Seller extends BaseUser {
  phoneNumber: string;
  profileUrl: string;
  createdAt?: string;
  isSuspended?: boolean;
}
