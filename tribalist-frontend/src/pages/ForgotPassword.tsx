// import React, { useState } from 'react';
// import { Box, Button, TextField, Typography, Alert } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { sendForgotPasswordEmail } from '../services/authService';

// export default function ForgotPassword() {
//   const [email, setEmail] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');

//       if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) 
//       {
//         setError('Please enter a valid email address.');
//         return;
//     }

//     try {
//       await sendForgotPasswordEmail(email);
//       setSuccess('OTP sent to your email!');
//       // Proceed to OTP page
//       setTimeout(() => navigate('/verify-otp'), 1500);
//     } catch (err: any) {
//       setError(err?.response?.data || 'Something went wrong!');
//     }
//   };

//   return (
//     <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8 }}>
//       <Typography variant="h5" gutterBottom>
//         Forgot Password
//       </Typography>

//       {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
//       {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

//       <form onSubmit={handleSubmit}>
//         <TextField
//           fullWidth
//           label="Email Address"
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           sx={{ mb: 3 }}
//         />

//         <Button type="submit" variant="contained" fullWidth>
//           Send OTP
//         </Button>
//       </form>
//     </Box>
//   );
// }
import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Paper,
  Container,
  InputAdornment,
  LinearProgress,
  Stepper,
  Step,
  StepLabel,
  alpha,
  Link
} from '@mui/material';
import {
  Email as EmailIcon,
  LockReset as ResetIcon,
  ArrowBack as BackIcon,
  Send as SendIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { sendForgotPasswordEmail } from '../services/authService';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const steps = ['Enter Email', 'Verify OTP', 'Reset Password'];
  const activeStep = 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    try {
      await sendForgotPasswordEmail(email);
      setSuccess('OTP sent to your email! Check your inbox and spam folder.');
      // Proceed to OTP page
      setTimeout(() => navigate('/verify-otp'), 2000);
    } catch (err: any) {
      setError(err?.response?.data || 'Something went wrong! Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError(''); // Clear error when user starts typing
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
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: 3,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: `1px solid ${alpha('#FF8F00', 0.1)}`,
            boxShadow: `0 8px 32px ${alpha('#3E2723', 0.1)}`
          }}
        >
          {/* Back Button */}
          <Button
            startIcon={<BackIcon />}
            onClick={() => navigate('/login')}
            sx={{
              mb: 2,
              color: '#6D4C41',
              textTransform: 'none',
              '&:hover': {
                bgcolor: alpha('#6D4C41', 0.05)
              }
            }}
          >
            Back to Login
          </Button>

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
                bgcolor: alpha('#FF8F00', 0.1),
                mb: 2
              }}
            >
              <ResetIcon sx={{ fontSize: 32, color: '#FF8F00' }} />
            </Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: '#3E2723',
                mb: 1
              }}
            >
              Forgot Password?
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: '#6D4C41', mb: 3 }}
            >
              No worries! Enter your email and we'll send you a reset code
            </Typography>

            {/* Progress Stepper */}
            <Box sx={{ mb: 3 }}>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel 
                      sx={{
                        '& .MuiStepLabel-label': {
                          fontSize: '0.875rem',
                          color: '#6D4C41'
                        },
                        '& .MuiStepIcon-root': {
                          color: alpha('#FF8F00', 0.3),
                          '&.Mui-active': {
                            color: '#FF8F00'
                          },
                          '&.Mui-completed': {
                            color: '#4CAF50'
                          }
                        }
                      }}
                    >
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Box>

          {/* Alert Messages */}
          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3, 
                borderRadius: 2,
                '& .MuiAlert-icon': {
                  color: '#f44336'
                }
              }}
            >
              {error}
            </Alert>
          )}
          
          {success && (
            <Alert 
              severity="success" 
              sx={{ 
                mb: 3, 
                borderRadius: 2,
                '& .MuiAlert-icon': {
                  color: '#4caf50'
                }
              }}
            >
              {success}
            </Alert>
          )}

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
              disabled={loading}
              placeholder="Enter your registered email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: '#6D4C41' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#FF8F00'
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#FF8F00'
                  }
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#FF8F00'
                }
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={loading}
              startIcon={loading ? undefined : <SendIcon />}
              sx={{
                py: 1.5,
                borderRadius: 2,
                bgcolor: '#FF8F00',
                fontWeight: 600,
                fontSize: '1.1rem',
                textTransform: 'none',
                boxShadow: `0 4px 12px ${alpha('#FF8F00', 0.3)}`,
                '&:hover': {
                  bgcolor: '#F57C00',
                  boxShadow: `0 6px 16px ${alpha('#FF8F00', 0.4)}`,
                  transform: 'translateY(-1px)'
                },
                '&:disabled': {
                  bgcolor: alpha('#FF8F00', 0.5),
                  color: 'white'
                }
              }}
            >
              {loading ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LinearProgress 
                    sx={{ 
                      width: 100, 
                      height: 4,
                      borderRadius: 2,
                      bgcolor: alpha('#fff', 0.3),
                      '& .MuiLinearProgress-bar': {
                        bgcolor: 'white'
                      }
                    }} 
                  />
                  <Typography>Sending...</Typography>
                </Box>
              ) : (
                'Send Reset Code'
              )}
            </Button>
          </Box>

          {/* Footer */}
          <Box sx={{ textAlign: 'center', mt: 3, pt: 3, borderTop: `1px solid ${alpha('#6D4C41', 0.1)}` }}>
            <Typography variant="body2" color="text.secondary">
              Remember your password?{' '}
              <Link
                component="button"
                variant="body2"
                onClick={() => navigate('/login')}
                sx={{
                  color: '#FF8F00',
                  textDecoration: 'none',
                  fontWeight: 500,
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                Sign in here
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}