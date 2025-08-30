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
// };
import React, { useState } from 'react';
import { Customer } from '../../types/User';
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Paper,
  Container,
  InputAdornment,
  IconButton,
  Grid,
  Stepper,
  Step,
  StepLabel,
  alpha,
  LinearProgress,
  Chip
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Home as HomeIcon,
  Phone as PhoneIcon,
  LocationCity as CityIcon,
  Visibility,
  VisibilityOff,
  AccountCircle as AccountIcon
} from '@mui/icons-material';

interface Props {
  onRegister: (data: Customer) => void;
}

export const CustomerRegisterForm: React.FC<Props> = ({ onRegister }) => {
  const [form, setForm] = useState<Customer>({
    name: '',
    email: '',
    password: '',
    address: '',
    phone: '',
    city: '',
    role: 'Customer',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [errors, setErrors] = useState<Partial<Record<keyof Customer, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const cities = [
    'Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale', 'Nuwara Eliya',
    'Galle', 'Matara', 'Hambantota', 'Jaffna', 'Kilinochchi', 'Mannar',
    'Vavuniya', 'Mullaitivu', 'Trincomalee', 'Batticaloa', 'Ampara',
    'Kurunegala', 'Puttalam', 'Anuradhapura', 'Polonnaruwa', 'Badulla',
    'Monaragala', 'Ratnapura', 'Kegalle',
  ];

  const steps = ['Personal Info', 'Contact Details', 'Location'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));

    // Clear error as user types
    if (errors[name as keyof Customer]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Partial<Record<keyof Customer, string>> = {};
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8}$/;

    if (!form.name || !form.name.trim()) newErrors.name = 'Name is required';

    if (!form.email || !form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (!strongPasswordRegex.test(form.password)) {
      newErrors.password = 'Password must be exactly 8 characters with uppercase, lowercase, number, and special character';
    }

    if (!form.address || !form.address.trim()) {
      newErrors.address = 'Address is required';
    }
    if (!form.phone || !form.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-()]{10,}$/.test(form.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!form.city || !form.city.trim()) {
      newErrors.city = 'City selection is required';
    }

    return newErrors;
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/\d/.test(password)) strength += 25;
    if (/[@$!%*?&]/.test(password)) strength += 25;
    return Math.min(strength, 100);
  };

  const getPasswordStrengthColor = (strength: number) => {
    if (strength < 50) return '#f44336';
    if (strength < 75) return '#ff9800';
    return '#4caf50';
  };

  const getCompletedFields = () => {
    let completed = 0;
    const totalFields = 6;
    if (form.name.trim()) completed++;
    if (form.email.trim()) completed++;
    if (form.password.trim()) completed++;
    if (form.address.trim()) completed++;
    if (form.phone.trim()) completed++;
    if (form.city.trim()) completed++;
    return (completed / totalFields) * 100;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onRegister(form);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, 
          ${alpha('#FFF8E1', 0.9)} 0%, 
          ${alpha('#F3E5AB', 0.7)} 50%, 
          ${alpha('#E8D5B7', 0.9)} 100%)`,
        py: 4
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: 3,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: `1px solid ${alpha('#2E7D32', 0.1)}`,
            boxShadow: `0 8px 32px ${alpha('#3E2723', 0.1)}`
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 64,
                height: 64,
                borderRadius: '50%',
                bgcolor: alpha('#2E7D32', 0.1),
                mb: 2
              }}
            >
              <AccountIcon sx={{ fontSize: 32, color: '#2E7D32' }} />
            </Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: '#3E2723',
                mb: 1
              }}
            >
              Join as Customer
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: '#6D4C41', mb: 2 }}
            >
              Discover amazing handicrafts from talented artisans
            </Typography>
            
            {/* Progress Indicator */}
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Registration Progress
                </Typography>
                <Chip 
                  size="small" 
                  label={`${Math.round(getCompletedFields())}%`}
                  color="primary"
                  variant="outlined"
                />
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={getCompletedFields()} 
                sx={{ 
                  height: 6, 
                  borderRadius: 3,
                  bgcolor: alpha('#2E7D32', 0.1),
                  '& .MuiLinearProgress-bar': {
                    bgcolor: '#2E7D32'
                  }
                }}
              />
            </Box>
          </Box>

          {/* Registration Form */}
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Personal Information */}
              <Grid>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: '#3E2723', 
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    mb: 2
                  }}
                >
                  <PersonIcon sx={{ mr: 1, color: '#2E7D32' }} />
                  Personal Information
                </Typography>
              </Grid>

              <Grid>
                <TextField
                  name="name"
                  label="Full Name"
                  fullWidth
                  value={form.name}
                  onChange={handleChange}
                  error={submitted && !!errors.name}
                  helperText={submitted && errors.name}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon sx={{ color: '#6D4C41' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#2E7D32'
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#2E7D32'
                      }
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#2E7D32'
                    }
                  }}
                />
              </Grid>

              <Grid>
                <TextField
                  name="email"
                  label="Email Address"
                  type="email"
                  fullWidth
                  value={form.email}
                  onChange={handleChange}
                  error={submitted && !!errors.email}
                  helperText={submitted && errors.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon sx={{ color: '#6D4C41' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#2E7D32'
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#2E7D32'
                      }
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#2E7D32'
                    }
                  }}
                />
              </Grid>

              <Grid>
                <TextField
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  fullWidth
                  value={form.password}
                  onChange={handleChange}
                  error={submitted && !!errors.password}
                  helperText={submitted && errors.password}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon sx={{ color: '#6D4C41' }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          sx={{ color: '#6D4C41' }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#2E7D32'
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#2E7D32'
                      }
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#2E7D32'
                    }
                  }}
                />
                {form.password && (
                  <Box sx={{ mt: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="caption" color="text.secondary">
                        Password Strength
                      </Typography>
                      <Typography variant="caption" sx={{ color: getPasswordStrengthColor(getPasswordStrength(form.password)) }}>
                        {getPasswordStrength(form.password) < 50 ? 'Weak' : 
                         getPasswordStrength(form.password) < 75 ? 'Medium' : 'Strong'}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={getPasswordStrength(form.password)}
                      sx={{
                        height: 4,
                        borderRadius: 2,
                        bgcolor: alpha('#ccc', 0.3),
                        '& .MuiLinearProgress-bar': {
                          bgcolor: getPasswordStrengthColor(getPasswordStrength(form.password))
                        }
                      }}
                    />
                  </Box>
                )}
              </Grid>

              {/* Contact Information */}
              <Grid>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: '#3E2723', 
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    mb: 2,
                    mt: 2
                  }}
                >
                  <PhoneIcon sx={{ mr: 1, color: '#2E7D32' }} />
                  Contact & Location
                </Typography>
              </Grid>

              <Grid>
                <TextField
                  name="address"
                  label="Address"
                  fullWidth
                  multiline
                  rows={2}
                  value={form.address}
                  onChange={handleChange}
                  error={submitted && !!errors.address}
                  helperText={submitted && errors.address}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <HomeIcon sx={{ color: '#6D4C41' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#2E7D32'
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#2E7D32'
                      }
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#2E7D32'
                    }
                  }}
                />
              </Grid>

              <Grid>
                <TextField
                  name="phone"
                  label="Phone Number"
                  fullWidth
                  value={form.phone}
                  onChange={handleChange}
                  error={submitted && !!errors.phone}
                  helperText={submitted && errors.phone}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon sx={{ color: '#6D4C41' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#2E7D32'
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#2E7D32'
                      }
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#2E7D32'
                    }
                  }}
                />
              </Grid>

              <Grid>
                <TextField
                  name="city"
                  label="City"
                  select
                  fullWidth
                  value={form.city}
                  onChange={handleChange}
                  error={submitted && !!errors.city}
                  helperText={submitted && errors.city}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CityIcon sx={{ color: '#6D4C41' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#2E7D32'
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#2E7D32'
                      }
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#2E7D32'
                    }
                  }}
                >
                  {cities.map((city) => (
                    <MenuItem key={city} value={city}>
                      {city}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* Submit Button */}
              <Grid>
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  size="large"
                  sx={{
                    mt: 2,
                    py: 1.5,
                    borderRadius: 2,
                    bgcolor: '#2E7D32',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    textTransform: 'none',
                    boxShadow: `0 4px 12px ${alpha('#2E7D32', 0.3)}`,
                    '&:hover': {
                      bgcolor: '#1B5E20',
                      boxShadow: `0 6px 16px ${alpha('#2E7D32', 0.4)}`,
                      transform: 'translateY(-1px)'
                    }
                  }}
                >
                  Create Customer Account
                </Button>
              </Grid>
            </Grid>
          </Box>

          {/* Footer */}
          <Box sx={{ textAlign: 'center', mt: 3, pt: 3, borderTop: `1px solid ${alpha('#6D4C41', 0.1)}` }}>
            <Typography variant="body2" color="text.secondary">
              By registering, you agree to our Terms of Service and Privacy Policy
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};