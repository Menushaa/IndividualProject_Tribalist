// import React, { useState } from 'react';
// import { Box, Button, TextField, Typography, Alert } from '@mui/material';
// import { verifyOtp } from '../services/authService';
// import { useNavigate } from 'react-router-dom';

// export default function VerifyOtp() {
//   const [otp, setOtp] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');

//       if (!/^\d{6}$/.test(otp)) 
//       {
//         setError('OTP must be a 6-digit number.');
//         return;
//       }

//     try {
//       await verifyOtp(otp);
//       setSuccess('OTP verified successfully!');
//       setTimeout(() => navigate('/reset'), 1500);
//     } catch (err: any) {
//       setError(err?.response?.data || 'Invalid or expired OTP.');
//     }
//   };

//   return (
//     <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8 }}>
//       <Typography variant="h5" gutterBottom>
//         Verify OTP
//       </Typography>

//       {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
//       {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

//       <form onSubmit={handleSubmit}>
//         <TextField
//           fullWidth
//           label="Enter OTP"
//           value={otp}
//           onChange={(e) => setOtp(e.target.value)}
//           required
//           sx={{ mb: 3 }}
//         />

//         <Button type="submit" variant="contained" fullWidth>
//           Verify OTP
//         </Button>
//       </form>
//     </Box>
//   );
// }
import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Button,
  Typography,
  Alert,
  Paper,
  Container,
  TextField,
  Stepper,
  Step,
  StepLabel,
  alpha,
  Link,
  Grid,
  Chip
} from '@mui/material';
import {
  Verified as VerifiedIcon,
  ArrowBack as BackIcon,
  Refresh as RefreshIcon,
  Security as SecurityIcon
} from '@mui/icons-material';
import { verifyOtp } from '../services/authService';
import { useNavigate } from 'react-router-dom';

export default function VerifyOtp() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const navigate = useNavigate();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const steps = ['Enter Email', 'Verify OTP', 'Reset Password'];
  const activeStep = 1;

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Prevent multiple characters
    if (!/^\d*$/.test(value)) return; // Only allow digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (error) setError(''); // Clear error when user starts typing

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newOtp = pastedData.split('').concat(Array(6).fill('')).slice(0, 6);
    setOtp(newOtp);
    
    // Focus the next empty input or last input
    const nextEmptyIndex = newOtp.findIndex(digit => digit === '');
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
    inputRefs.current[focusIndex]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const otpString = otp.join('');

    if (otpString.length !== 6) {
      setError('Please enter the complete 6-digit OTP.');
      return;
    }

    if (!/^\d{6}$/.test(otpString)) {
      setError('OTP must be a 6-digit number.');
      return;
    }

    setLoading(true);

    try {
      await verifyOtp(otpString);
      setSuccess('OTP verified successfully! Redirecting...');
      setTimeout(() => navigate('/reset'), 1500);
    } catch (err: any) {
      setError(err?.response?.data || 'Invalid or expired OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    // Add resend functionality here
    setTimeLeft(300);
    setError('');
    setSuccess('New OTP sent to your email!');
  };

  const isOtpComplete = otp.every(digit => digit !== '');

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
            border: `1px solid ${alpha('#2196F3', 0.1)}`,
            boxShadow: `0 8px 32px ${alpha('#3E2723', 0.1)}`
          }}
        >
          {/* Back Button */}
          <Button
            startIcon={<BackIcon />}
            onClick={() => navigate('/forgot')}
            sx={{
              mb: 2,
              color: '#6D4C41',
              textTransform: 'none',
              '&:hover': {
                bgcolor: alpha('#6D4C41', 0.05)
              }
            }}
          >
            Back to Email
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
                bgcolor: alpha('#2196F3', 0.1),
                mb: 2
              }}
            >
              <SecurityIcon sx={{ fontSize: 32, color: '#2196F3' }} />
            </Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: '#3E2723',
                mb: 1
              }}
            >
              Verify Your Email
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: '#6D4C41', mb: 1 }}
            >
              We've sent a 6-digit verification code to your email
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: '#8D6E63' }}
            >
              Please check your inbox and enter the code below
            </Typography>

            {/* Progress Stepper */}
            <Box sx={{ mb: 3, mt: 3 }}>
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
                          color: alpha('#2196F3', 0.3),
                          '&.Mui-active': {
                            color: '#2196F3'
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

            {/* Timer */}
            <Chip
              label={`Code expires in: ${formatTime(timeLeft)}`}
              color={timeLeft < 60 ? 'error' : 'default'}
              variant="outlined"
              sx={{ mb: 2 }}
            />
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

          {/* OTP Input Form */}
          <Box component="form" onSubmit={handleSubmit}>
            <Typography
              variant="subtitle1"
              sx={{
                textAlign: 'center',
                fontWeight: 500,
                color: '#3E2723',
                mb: 3
              }}
            >
              Enter Verification Code
            </Typography>

            <Grid container spacing={1} justifyContent="center" sx={{ mb: 4 }}>
              {otp.map((digit, index) => (
                <Grid>
                  <TextField
                    inputRef={(ref) => {
                      inputRefs.current[index] = ref;
                    }}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    variant="outlined"
                    inputProps={{
                      maxLength: 1,
                      style: { 
                        textAlign: 'center', 
                        fontSize: '1.5rem',
                        fontWeight: 600,
                        padding: '12px 8px'
                      }
                    }}
                    sx={{
                      width: 56,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#2196F3'
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#2196F3',
                          borderWidth: 2
                        }
                      },
                      '& input': {
                        color: digit ? '#2196F3' : '#666'
                      }
                    }}
                  />
                </Grid>
              ))}
            </Grid>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={loading || !isOtpComplete}
              startIcon={loading ? undefined : <VerifiedIcon />}
              sx={{
                py: 1.5,
                borderRadius: 2,
                bgcolor: '#2196F3',
                fontWeight: 600,
                fontSize: '1.1rem',
                textTransform: 'none',
                boxShadow: `0 4px 12px ${alpha('#2196F3', 0.3)}`,
                '&:hover': {
                  bgcolor: '#1976D2',
                  boxShadow: `0 6px 16px ${alpha('#2196F3', 0.4)}`,
                  transform: 'translateY(-1px)'
                },
                '&:disabled': {
                  bgcolor: alpha('#2196F3', 0.5),
                  color: 'white'
                }
              }}
            >
              {loading ? 'Verifying...' : 'Verify Code'}
            </Button>
          </Box>

          {/* Resend Section */}
          <Box sx={{ textAlign: 'center', mt: 3, pt: 3, borderTop: `1px solid ${alpha('#6D4C41', 0.1)}` }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Didn't receive the code?
            </Typography>
            {timeLeft > 0 ? (
              <Typography variant="body2" color="text.secondary">
                You can request a new code in {formatTime(timeLeft)}
              </Typography>
            ) : (
              <Link
                component="button"
                variant="body2"
                onClick={handleResendOtp}
                sx={{
                  color: '#2196F3',
                  textDecoration: 'none',
                  fontWeight: 500,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.5,
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                <RefreshIcon sx={{ fontSize: 16 }} />
                Resend Code
              </Link>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}