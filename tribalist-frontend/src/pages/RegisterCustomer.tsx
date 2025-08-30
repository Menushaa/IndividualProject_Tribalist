import React from 'react';
import { Customer } from '../types/User';
import { registerCustomer } from '../services/authService';
import { CustomerRegisterForm } from '../components/Auth/CustomerRegisterForm';
import { useNavigate } from 'react-router-dom';

export default function RegisterCustomer() {
  const navigate = useNavigate();

  const handleRegister = async (data: Customer) => {
    try {
      await registerCustomer(data);
      alert('Customer registered successfully!');
      navigate('/login');
    } catch (err: any) {
      alert('Registration failed: ' + err.message);
    }
  };

  return <CustomerRegisterForm onRegister={handleRegister} />;
}
