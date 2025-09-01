import React from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Paper,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { registerCustomer } from "../services/authService";
import { Customer } from "../types/User";
import CustomerRegisterForm from "../components/Auth/CustomerRegisterForm";

// ✅ Zod Validation Schema
const customerRegisterSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must be at most 20 characters"),
    phone: z
      .string()
      .min(10, "Phone must be at least 10 digits")
      .max(15, "Phone number is too long"),
    address: z.string().min(5, "Address must be at least 5 characters"),
    city: z.string().min(2, "City is required"),
  })
  .required();

// ✅ Type Inference from Schema
type CustomerRegisterFormData = z.infer<typeof customerRegisterSchema>;

const CustomerRegister: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CustomerRegisterFormData>({
    resolver: zodResolver(customerRegisterSchema),
    mode: "onBlur",
  });

  const handleRegister = async (data: CustomerRegisterFormData) => {
    try {
      const customerData: Customer = {
        ...data,
        role: "Customer",
      };
      await registerCustomer(customerData);
      alert("Customer registered successfully!");
      reset(); // ✅ Clear form after 
      navigate("/login");
    } catch (err: any) {
      alert("Registration failed: " + err.message);
    }
  };

  return <CustomerRegisterForm onSubmit={handleRegister} />;
};

export default CustomerRegister;
