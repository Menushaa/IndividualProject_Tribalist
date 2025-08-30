import React from 'react';
import { Seller } from '../types/User';
import { registerSeller } from '../services/authService';
import { SellerRegisterForm } from '../components/Auth/SellerRegisterForm';
import { useNavigate } from 'react-router-dom';

export default function RegisterSeller() {
  const navigate = useNavigate();

  const handleRegister = async (data: Seller) => {
    try {
      await registerSeller(data);
      alert('Seller registered successfully!');
      navigate('/login');
    } catch (err: any) {
      alert('Registration failed: ' + err.message);
    }
  };

  return <SellerRegisterForm onRegister={handleRegister} />;
}


