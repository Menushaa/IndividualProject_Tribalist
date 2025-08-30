import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import RegisterRoleSelect from './pages/RegisterRoleSelect';
import RegisterCustomer from './pages/RegisterCustomer';
import RegisterSeller from './pages/RegisterSeller';
import { Box, Typography } from '@mui/material';
import ForgotPassword from './pages/ForgotPassword';
import VerifyOtp from './pages/VerifyOtp';
import ResetPassword from './pages/ResetPassword';
import TribalistHomepage from './components/Auth/HomePage';
import SellerDashboard from './pages/SellerDashboard';

function App() {
  return (
    <BrowserRouter>
      {/* <Box sx={{ py: 5 }}> */}

        <Routes>
          <Route path="" element={<TribalistHomepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterRoleSelect />} />
          <Route path="/register/customer" element={<RegisterCustomer />} />
          <Route path="/register/seller" element={<RegisterSeller />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/reset" element={<ResetPassword />} />
          <Route path="/dashboard" element={<SellerDashboard/>} />
        </Routes>
      {/* </Box> */}
    </BrowserRouter>
  );
}

export default App;
