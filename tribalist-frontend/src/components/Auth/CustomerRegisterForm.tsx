// import React, { useState } from 'react';
// import { Customer } from '../../types/User';
// import { Box, TextField, Button, Typography, MenuItem } from '@mui/material';

// interface Props {
//   onRegister: (data: Customer) => void;
// }

// export const CustomerRegisterForm: React.FC<Props> = ({ onRegister }) => {
//   const [form, setForm] = useState<Customer>({
//     name: '',
//     email: '',
//     password: '',
//     address: '',
//     phone: '',
//     city: '',
//     role: 'Customer',
//   });

//   const cities = [
//   'Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale', 'Nuwara Eliya',
//   'Galle', 'Matara', 'Hambantota', 'Jaffna', 'Kilinochchi', 'Mannar',
//   'Vavuniya', 'Mullaitivu', 'Trincomalee', 'Batticaloa', 'Ampara',
//   'Kurunegala', 'Puttalam', 'Anuradhapura', 'Polonnaruwa', 'Badulla',
//   'Monaragala', 'Ratnapura', 'Kegalle',
// ];


//   const [errors, setErrors] = useState<Partial<Record<keyof Customer, string>>>({});
//   const [submitted, setSubmitted] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setForm(prev => ({ ...prev, [name]: value }));

//     // Clear error as user types
//     if (errors[name as keyof Customer]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   const validate = () => {
//     const newErrors: Partial<Record<keyof Customer, string>> = {};
//     const strongPasswordRegex =
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8}$/;

//     if (!form.name || !form.name.trim()) newErrors.name = 'Name is required';

//     if (!form.email || !form.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
//       newErrors.email = 'Invalid email address';
//     }

//     if (!form.password) {
//       newErrors.password = 'Password is required';
//     } else if (!strongPasswordRegex.test(form.password)) {
//       newErrors.password = 'Password must be exactly 8 characters, A-Z, a-z, number, special char';
//     }

//     if (!form.address || !form.address.trim()) {
//       newErrors.address = 'Address is required';
//     }
//     if (!form.phone || !form.phone.trim()) {
//       newErrors.phone = 'Phone is required';
//     }
//     if (!form.city || !form.city.trim()) {
//       newErrors.city = 'City is required';
//     }

//     return newErrors;
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setSubmitted(true);

//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     onRegister(form);
//   };

//   return (
//     <Box component="form" onSubmit={handleSubmit} sx={{ width: 400, mx: 'auto' }}>
//       <Typography variant="h5" mb={2}>
//         Customer Registration
//       </Typography>

//       <TextField
//         id='name'
//         name="name"
//         label="Name"
//         fullWidth
//         margin="normal"
//         value={form.name}
//         onChange={handleChange}
//         error={submitted && !!errors.name}
//         helperText={submitted && errors.name}
//       />

//       <TextField
//         id='email'
//         name="email"
//         label="Email"
//         type="email"
//         fullWidth
//         margin="normal"
//         value={form.email}
//         onChange={handleChange}
//         error={submitted && !!errors.email}
//         helperText={submitted && errors.email}
//       />

//       <TextField
//         id='password'
//         name="password"
//         label="Password"
//         type="password"
//         fullWidth
//         margin="normal"
//         value={form.password}
//         onChange={handleChange}
//         error={submitted && !!errors.password}
//         helperText={submitted && errors.password}
//       />

//       <TextField
//         id='address'
//         name="address"
//         label="Address"
//         fullWidth
//         margin="normal"
//         value={form.address}
//         onChange={handleChange}
//         error={submitted && !!errors.address}
//         helperText={submitted && errors.address}
//       />

//       <TextField
//         id='phone'
//         name="phone"
//         label="Phone"
//         fullWidth
//         margin="normal"
//         value={form.phone}
//         onChange={handleChange}
//         error={submitted && !!errors.phone}
//         helperText={submitted && errors.phone}
//       />

//       <TextField
//         name="city"
//         label="City"
//         select
//         fullWidth
//         margin="normal"
//         value={form.city}
//         onChange={handleChange}
//         error={submitted && !!errors.city}
//         helperText={submitted && errors.city}
//       >
//         {cities.map((city) => (
//           <MenuItem key={city} value={city}>
//             {city}
//           </MenuItem>
//         ))}
//       </TextField>


//       <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
//         Register as Customer
//       </Button>
//     </Box>
//   );
// };import React from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Paper,
  InputAdornment,
  alpha,
} from "@mui/material";
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Home as HomeIcon,
  Phone as PhoneIcon,
  LocationCity as LocationCityIcon
} from '@mui/icons-material';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Zod Validation Schema
const customerRegisterSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be at most 20 characters"),
  confirmPassword: z.string(),
  phone: z
    .string()
    .min(10, "Phone must be at least 10 digits")
    .max(15, "Phone number is too long"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City is required"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Type Inference from Schema
type CustomerRegisterFormData = z.infer<typeof customerRegisterSchema>;

interface CustomerRegisterFormProps {
  onSubmit: (data: CustomerRegisterFormData) => void;
}

const CustomerRegisterForm: React.FC<CustomerRegisterFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CustomerRegisterFormData>({
    resolver: zodResolver(customerRegisterSchema),
    mode: "onBlur",
  });

return (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh"
    sx={{
      background: `linear-gradient(135deg, 
        ${alpha("#FFF3E0", 0.9)} 0%, 
        ${alpha("#FFE0B2", 0.7)} 50%, 
        ${alpha("#FFCC80", 0.9)} 100%)`,
      py: 4,
    }}
  >
    <Paper
      elevation={0}
      sx={{
        padding: 4,
        width: "100%",
        maxWidth: 500,
        borderRadius: 3,
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        border: `1px solid ${alpha("#D84315", 0.1)}`,
        boxShadow: `0 8px 32px ${alpha("#3E2723", 0.15)}`,
      }}
    >
      {/* Header */}
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 64,
            height: 64,
            borderRadius: "50%",
            bgcolor: alpha("#D84315", 0.1),
            mb: 2,
          }}
        >
          <PersonIcon sx={{ fontSize: 32, color: "#D84315" }} />
        </Box>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: "#3E2723",
            mb: 1,
          }}
        >
          Customer Registration
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#6D4C41" }}
        >
          Join our platform and start exploring unique handicrafts!
        </Typography>
      </Box>

      {/* Registration Form */}
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        {/* Name */}
        <TextField
          label="Full Name"
          fullWidth
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon sx={{ color: "#6D4C41" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#D84315",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#D84315",
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#D84315",
            },
          }}
        />

        {/* Email */}
        <TextField
          label="Email Address"
          fullWidth
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon sx={{ color: "#6D4C41" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#D84315",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#D84315",
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#D84315",
            },
          }}
        />

        {/* Password */}
        <TextField
          label="Password"
          type="password"
          fullWidth
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon sx={{ color: "#6D4C41" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#D84315",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#D84315",
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#D84315",
            },
          }}
        />

        {/* Confirm Password */}
        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
          {...register("confirmPassword")}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon sx={{ color: "#6D4C41" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#D84315",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#D84315",
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#D84315",
            },
          }}
        />

        {/* Phone */}
        <TextField
          label="Phone Number"
          fullWidth
          {...register("phone")}
          error={!!errors.phone}
          helperText={errors.phone?.message}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhoneIcon sx={{ color: "#6D4C41" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#D84315",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#D84315",
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#D84315",
            },
          }}
        />

        {/* Address */}
        <TextField
          label="Address"
          fullWidth
          {...register("address")}
          error={!!errors.address}
          helperText={errors.address?.message}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <HomeIcon sx={{ color: "#6D4C41" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#D84315",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#D84315",
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#D84315",
            },
          }}
        />

        {/* City */}
        <TextField
          label="City"
          select
          fullWidth
          {...register("city")}
          error={!!errors.city}
          helperText={errors.city?.message}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocationCityIcon sx={{ color: "#6D4C41" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#D84315",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#D84315",
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#D84315",
            },
          }}
        >
        <MenuItem value="Colombo">Colombo</MenuItem>
        <MenuItem value="Gampaha">Gampaha</MenuItem>
        <MenuItem value="Kalutara">Kalutara</MenuItem>
        <MenuItem value="Kandy">Kandy</MenuItem>
        <MenuItem value="Matale">Matale</MenuItem>
        <MenuItem value="Nuwara Eliya">Nuwara Eliya</MenuItem>
        <MenuItem value="Galle">Galle</MenuItem>
        <MenuItem value="Matara">Matara</MenuItem>
        <MenuItem value="Hambantota">Hambantota</MenuItem>
        <MenuItem value="Jaffna">Jaffna</MenuItem>
        <MenuItem value="Kilinochchi">Kilinochchi</MenuItem>
        <MenuItem value="Mannar">Mannar</MenuItem>
        <MenuItem value="Vavuniya">Vavuniya</MenuItem>
        <MenuItem value="Mullaitivu">Mullaitivu</MenuItem>
        <MenuItem value="Batticaloa">Batticaloa</MenuItem>
        <MenuItem value="Ampara">Ampara</MenuItem>
        <MenuItem value="Trincomalee">Trincomalee</MenuItem>
        <MenuItem value="Kurunegala">Kurunegala</MenuItem>
        <MenuItem value="Puttalam">Puttalam</MenuItem>
        <MenuItem value="Anuradhapura">Anuradhapura</MenuItem>
        <MenuItem value="Polonnaruwa">Polonnaruwa</MenuItem>
        <MenuItem value="Badulla">Badulla</MenuItem>
        <MenuItem value="Monaragala">Monaragala</MenuItem>
        <MenuItem value="Ratnapura">Ratnapura</MenuItem>
        <MenuItem value="Kegalle">Kegalle</MenuItem>

        </TextField>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          disabled={isSubmitting}
          sx={{
            mt: 2,
            py: 1.5,
            borderRadius: 2,
            bgcolor: "#D84315",
            fontWeight: 600,
            fontSize: "1.1rem",
            textTransform: "none",
            boxShadow: `0 4px 12px ${alpha("#D84315", 0.3)}`,
            "&:hover": {
              bgcolor: "#BF360C",
              boxShadow: `0 6px 16px ${alpha("#D84315", 0.4)}`,
              transform: "translateY(-1px)",
            },
            "&:disabled": {
              bgcolor: alpha("#D84315", 0.5),
              color: "white",
            },
          }}
        >
          {isSubmitting ? "Registering..." : "Register"}
        </Button>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          textAlign: "center",
          mt: 3,
          pt: 3,
          borderTop: `1px solid ${alpha("#6D4C41", 0.1)}`,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          By registering, you agree to our Terms of Service and Privacy Policy.
        </Typography>
      </Box>
    </Paper>
  </Box>
);

};

export default CustomerRegisterForm;
