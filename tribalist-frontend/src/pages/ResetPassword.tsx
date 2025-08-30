// import React, { useState } from 'react';
// import { Box, Button, TextField, Typography, Alert } from '@mui/material';
// import { resetPassword } from '../services/authService';
// import { useNavigate } from 'react-router-dom';

// export default function ResetPassword() {
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');

//     const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

//     if (!strongPasswordRegex.test(newPassword)) {
//       setError(
//         'Password must be at least 8 characters, include uppercase, lowercase, number, and special character.'
//       );
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       setError('Passwords do not match.');
//       return;
//     }

//     try {
//       await resetPassword(newPassword);
//       setSuccess('Password reset successfully!');
//       setTimeout(() => navigate('/login'), 1500); 
//     } catch (err: any) {
//       setError(err?.response?.data || 'Reset failed. Try again.');
//     }
//   };

//   return (
//     <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8 }}>
//       <Typography variant="h5" gutterBottom>
//         Reset Password
//       </Typography>

//       {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
//       {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

//       <form onSubmit={handleSubmit}>
//         <TextField
//           fullWidth
//           label="New Password"
//           type="password"
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//           required
//           sx={{ mb: 3 }}
//         />
//         <TextField
//           fullWidth
//           label="Confirm Password"
//           type="password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           required
//           sx={{ mb: 3 }}
//         />

//         <Button type="submit" variant="contained" fullWidth>
//           Reset Password
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
  IconButton,
  LinearProgress,
  Stepper,
  Step,
  StepLabel,
  alpha,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse
} from '@mui/material';
import {
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
  ArrowBack as BackIcon,
  CheckCircle as CheckIcon,
  Cancel as CancelIcon,
  Info as InfoIcon,
  LockReset as ResetIcon
} from '@mui/icons-material';
import { resetPassword } from '../services/authService';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showRequirements, setShowRequirements] = useState(false);
  const navigate = useNavigate();

  const steps = ['Enter Email', 'Verify OTP', 'Reset Password'];
  const activeStep = 2;

  const passwordRequirements = [
    { text: 'At least 8 characters', test: (pwd: string) => pwd.length >= 8 },
    { text: 'One uppercase letter', test: (pwd: string) => /[A-Z]/.test(pwd) },
    { text: 'One lowercase letter', test: (pwd: string) => /[a-z]/.test(pwd) },
    { text: 'One number', test: (pwd: string) => /\d/.test(pwd) },
    { text: 'One special character', test: (pwd: string) => /[@$!%*?&]/.test(pwd) }
  ];

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    passwordRequirements.forEach(req => {
      if (req.test(password)) strength += 20;
    });
    return strength;
  };

  const getPasswordStrengthColor = (strength: number) => {
    if (strength < 40) return '#f44336';
    if (strength < 80) return '#ff9800';
    return '#4caf50';
  };

  const getPasswordStrengthText = (strength: number) => {
    if (strength < 40) return 'Weak';
    if (strength < 80) return 'Medium';
    return 'Strong';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!strongPasswordRegex.test(newPassword)) {
      setError('Password does not meet the requirements below.');
      setShowRequirements(true);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match. Please check and try again.');
      return;
    }

    setLoading(true);

    try {
      await resetPassword(newPassword);
      setSuccess('Password reset successfully! You can now sign in with your new password.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err: any) {
      setError(err?.response?.data || 'Reset failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewPassword(value);
    if (error) setError(''); // Clear error when user starts typing
    setShowRequirements(value.length > 0); // Show requirements when typing
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    if (error) setError(''); // Clear error when user starts typing
  };

  const passwordsMatch = newPassword && confirmPassword && newPassword === confirmPassword;
  const passwordStrength = getPasswordStrength(newPassword);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, 
          ${alpha('#E8F5E8', 0.9)} 0%, 
          ${alpha('#C8E6C9', 0.7)} 50%, 
          ${alpha('#A5D6A7', 0.9)} 100%)`,
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
            border: `1px solid ${alpha('#4CAF50', 0.1)}`,
            boxShadow: `0 8px 32px ${alpha('#3E2723', 0.1)}`
          }}
        >
          {/* Back Button */}
          <Button
            startIcon={<BackIcon />}
            onClick={() => navigate('/verify-otp')}
            sx={{
              mb: 2,
              color: '#6D4C41',
              textTransform: 'none',
              '&:hover': {
                bgcolor: alpha('#6D4C41', 0.05)
              }
            }}
          >
            Back to Verification
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
                bgcolor: alpha('#4CAF50', 0.1),
                mb: 2
              }}
            >
              <ResetIcon sx={{ fontSize: 32, color: '#4CAF50' }} />
            </Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: '#3E2723',
                mb: 1
              }}
            >
              Create New Password
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: '#6D4C41', mb: 1 }}
            >
              Your new password must be different from previously used passwords
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
                          color: alpha('#4CAF50', 0.3),
                          '&.Mui-active': {
                            color: '#4CAF50'
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
            {/* New Password Field */}
            <TextField
              fullWidth
              label="New Password"
              type={showNewPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={handlePasswordChange}
              required
              disabled={loading}
              placeholder="Enter your new password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: '#6D4C41' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      edge="end"
                      sx={{ color: '#6D4C41' }}
                    >
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#4CAF50'
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#4CAF50'
                  }
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#4CAF50'
                }
              }}
            />

            {/* Password Strength Indicator */}
            {newPassword && (
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Password Strength
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: getPasswordStrengthColor(passwordStrength),
                      fontWeight: 500
                    }}
                  >
                    {getPasswordStrengthText(passwordStrength)}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={passwordStrength}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    bgcolor: alpha('#ccc', 0.3),
                    '& .MuiLinearProgress-bar': {
                      bgcolor: getPasswordStrengthColor(passwordStrength),
                      borderRadius: 3
                    }
                  }}
                />
              </Box>
            )}

            {/* Password Requirements */}
            <Collapse in={showRequirements}>
              <Box 
                sx={{ 
                  mb: 3, 
                  p: 2, 
                  bgcolor: alpha('#4CAF50', 0.05),
                  borderRadius: 2,
                  border: `1px solid ${alpha('#4CAF50', 0.2)}`
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <InfoIcon sx={{ color: '#4CAF50', fontSize: 20, mr: 1 }} />
                  <Typography variant="subtitle2" sx={{ color: '#4CAF50', fontWeight: 600 }}>
                    Password Requirements
                  </Typography>
                </Box>
                <List dense sx={{ py: 0 }}>
                  {passwordRequirements.map((req, index) => {
                    const isValid = req.test(newPassword);
                    return (
                      <ListItem key={index} sx={{ py: 0.5, px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          {isValid ? (
                            <CheckIcon sx={{ color: '#4CAF50', fontSize: 18 }} />
                          ) : (
                            <CancelIcon sx={{ color: '#f44336', fontSize: 18 }} />
                          )}
                        </ListItemIcon>
                        <ListItemText 
                          primary={req.text}
                          primaryTypographyProps={{
                            variant: 'body2',
                            color: isValid ? '#4CAF50' : '#6D4C41'
                          }}
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </Box>
            </Collapse>

            {/* Confirm Password Field */}
            <TextField
              fullWidth
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
              disabled={loading}
              placeholder="Confirm your new password"
              helperText={confirmPassword && !passwordsMatch ? 'Passwords do not match' : ''}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: '#6D4C41' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                      sx={{ color: '#6D4C41' }}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                    {confirmPassword && (
                      <Box sx={{ ml: 1 }}>
                        {passwordsMatch ? (
                          <CheckIcon sx={{ color: '#4CAF50', fontSize: 20 }} />
                        ) : (
                          <CancelIcon sx={{ color: '#f44336', fontSize: 20 }} />
                        )}
                      </Box>
                    )}
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#4CAF50'
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#4CAF50'
                  }
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#4CAF50'
                }
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={loading || !passwordsMatch || passwordStrength < 100}
              sx={{
                py: 1.5,
                borderRadius: 2,
                bgcolor: '#4CAF50',
                fontWeight: 600,
                fontSize: '1.1rem',
                textTransform: 'none',
                boxShadow: `0 4px 12px ${alpha('#4CAF50', 0.3)}`,
                '&:hover': {
                  bgcolor: '#388E3C',
                  boxShadow: `0 6px 16px ${alpha('#4CAF50', 0.4)}`,
                  transform: 'translateY(-1px)'
                },
                '&:disabled': {
                  bgcolor: alpha('#4CAF50', 0.5),
                  color: 'white'
                }
              }}
            >
              {loading ? 'Resetting Password...' : 'Reset Password'}
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
                  color: '#4CAF50',
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