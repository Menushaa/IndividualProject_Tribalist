import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../components/Auth/LoginForm';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (data: { role: string; email: string; password: string }) => {
    console.log('Logging in as:', data.role, data.email);
    alert(`Logged in as ${data.role}`);
    // Navigate to dashboard based on role if needed
  };

  return (
    <LoginForm
      onLogin={handleLogin}
      onRegisterRedirect={() => navigate('/register')}
      onForgotPassword={() => navigate('/forgot')}
    />
  );
}
