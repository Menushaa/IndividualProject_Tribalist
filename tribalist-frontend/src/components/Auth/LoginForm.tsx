// import React, { useState } from 'react';
// import { Box, Button, TextField, Typography, ToggleButton, ToggleButtonGroup, Stack, Link } from '@mui/material';
// import PersonIcon from '@mui/icons-material/Person';
// import StoreIcon from '@mui/icons-material/Store';

// interface LoginFormProps {
//   onLogin: (data: { role: string; email: string; password: string }) => void;
//   onRegisterRedirect: () => void;
//   onForgotPassword: () => void;
// }

// export const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onRegisterRedirect, onForgotPassword }) => {
//   const [role, setRole] = useState<'Customer' | 'Seller'>('Customer');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleRoleChange = (_: any, newRole: 'Customer' | 'Seller' | null) => {
//     if (newRole !== null) setRole(newRole);
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onLogin({ role, email, password });
//   };

//   return (
//     <Box sx={{ width: 400, mx: 'auto', p: 4, boxShadow: 3, borderRadius: 2 }}>
//       <Typography variant="h5" mb={2}>Sign In</Typography>
//       <Typography mb={1}>Please select your role</Typography>

//       <ToggleButtonGroup
//         fullWidth
//         value={role}
//         exclusive
//         onChange={handleRoleChange}
//         sx={{ mb: 3 }}
//       >
//         <ToggleButton value="Customer">
//           <PersonIcon sx={{ mr: 1 }} />
//           Customer
//         </ToggleButton>
//         <ToggleButton value="Seller">
//           <StoreIcon sx={{ mr: 1 }} />
//           Artisan
//         </ToggleButton>
//       </ToggleButtonGroup>

//       <form onSubmit={handleSubmit}>
//         <TextField
//           label="Email"
//           type="email"
//           fullWidth
//           required
//           margin="normal"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <TextField
//           label="Password"
//           type="password"
//           fullWidth
//           required
//           margin="normal"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
//           Login
//         </Button>
//       </form>

//       <Stack direction="row" justifyContent="space-between" mt={2}>
//         <Link component="button" variant="body2" onClick={onForgotPassword}>
//           Forgot your password?
//         </Link>
//         <Link component="button" variant="body2" onClick={onRegisterRedirect}>
//           Register now?
//         </Link>
//       </Stack>
//     </Box>
//   );
// };

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Stack,
  Link,
  Paper,
  Container,
  InputAdornment,
  IconButton,
  Divider,
  alpha,
  useTheme
} from '@mui/material';
import {
  Person as PersonIcon,
  Store as StoreIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
  Login as LoginIcon,
  Home as HomeIcon
} from '@mui/icons-material';

interface LoginFormProps {
  onLogin: (data: { role: string; email: string; password: string }) => void;
  onRegisterRedirect: () => void;
  onForgotPassword: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ 
  onLogin, 
  onRegisterRedirect, 
  onForgotPassword 
}) => {
  const [role, setRole] = useState<'Customer' | 'Seller'>('Customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const navigate = useNavigate();
  
  const theme = useTheme();

  const handleRoleChange = (_: any, newRole: 'Customer' | 'Seller' | null) => {
    if (newRole !== null) setRole(newRole);
  };

  const validateForm = () => {
  const newErrors: { email?: string; password?: string } = {};

  if (!email.trim()) {
    newErrors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    newErrors.email = 'Please enter a valid email';
  }

  if (!password.trim()) {
    newErrors.password = 'Password is required';
  } else if (password.length < 6) {
    newErrors.password = 'Password must be at least 6 characters';
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0; // valid if no errors
};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onLogin({ role, email, password });
      navigate('/dashboard')
    }
  };

  const handleInputChange = (field: 'email' | 'password', value: string) => {
    if (field === 'email') {
      setEmail(value);
      if (errors.email) {
        setErrors(prev => ({ ...prev, email: undefined })); 
      }
    } else {
      setPassword(value);
      if (errors.password) {
        setErrors(prev => ({ ...prev, password: undefined })); 
      }
    }
  };


  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, 
          ${alpha('#FFF8E1', 0.9)} 0%, 
          ${alpha('#F3E5AB', 0.7)} 50%, 
          ${alpha('#E8D5B7', 0.9)} 100%)`,
        display: 'flex',
        alignItems: 'center',
        py: 4
      }}
    >
      <Button
        startIcon={<HomeIcon />}
        onClick={() => navigate('/')}  
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            bgcolor: 'transparent',
            color: '#6D4C41',
            '&:hover': {
              bgcolor: alpha('#D84315', 0.1),
            },
          }}
        >  
        HOME  
      </Button>
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: 3,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: `1px solid ${alpha('#D84315', 0.1)}`,
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
                bgcolor: alpha('#D84315', 0.1),
                mb: 2
              }}
            >
              <LoginIcon sx={{ fontSize: 32, color: '#D84315' }} />
            </Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: '#3E2723',
                mb: 1
              }}
            >
              Welcome Back
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: '#6D4C41' }}
            >
              Sign in to continue your craft journey
            </Typography>
          </Box>

          {/* Role Selection */}
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 500,
                color: '#3E2723',
                mb: 1.5
              }}
            >
              Select your role
            </Typography>
            <ToggleButtonGroup
              fullWidth
              value={role}
              exclusive
              onChange={handleRoleChange}
              sx={{
                '& .MuiToggleButton-root': {
                  py: 1.5,
                  border: `2px solid ${alpha('#D84315', 0.2)}`,
                  borderRadius: '12px !important',
                  color: '#6D4C41',
                  fontWeight: 500,
                  '&:hover': {
                    bgcolor: alpha('#D84315', 0.05),
                    borderColor: alpha('#D84315', 0.3)
                  },
                  '&.Mui-selected': {
                    bgcolor: alpha('#D84315', 0.1),
                    borderColor: '#D84315',
                    color: '#D84315',
                    '&:hover': {
                      bgcolor: alpha('#D84315', 0.15)
                    }
                  }
                },
                '& .MuiToggleButton-root:first-of-type': {
                  mr: 1
                }
              }}
            >
              <ToggleButton value="Customer">
                <PersonIcon sx={{ mr: 1, fontSize: 20 }} />
                Customer
              </ToggleButton>
              <ToggleButton value="Seller">
                <StoreIcon sx={{ mr: 1, fontSize: 20 }} />
                Artisan
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {/* Login Form */}
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              margin="normal"
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
                    borderColor: '#D84315'
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#D84315'
                  }
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#D84315'
                }
              }}
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
              margin="normal"
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
                    borderColor: '#D84315'
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#D84315'
                  }
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#D84315'
                }
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                mt: 3,
                py: 1.5,
                borderRadius: 2,
                bgcolor: '#D84315',
                fontWeight: 600,
                fontSize: '1.1rem',
                textTransform: 'none',
                boxShadow: `0 4px 12px ${alpha('#D84315', 0.3)}`,
                '&:hover': {
                  bgcolor: '#BF360C',
                  boxShadow: `0 6px 16px ${alpha('#D84315', 0.4)}`,
                  transform: 'translateY(-1px)'
                }
              }}
            >
              Sign In
            </Button>
          </Box>

          <Divider sx={{ my: 3, color: '#6D4C41' }}>
            <Typography variant="body2" sx={{ px: 2, color: '#6D4C41' }}>
              Need help?
            </Typography>
          </Divider>

          {/* Footer Links */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
          >
            <Link
              component="button"
              variant="body2"
              onClick={onForgotPassword}
              sx={{
                color: '#D84315',
                textDecoration: 'none',
                fontWeight: 500,
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              Forgot your password?
            </Link>
            <Link
              component="button"
              variant="body2"
              onClick={onRegisterRedirect}
              sx={{
                color: '#2E7D32',
                textDecoration: 'none',
                fontWeight: 500,
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              New here? Register now
            </Link>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};
