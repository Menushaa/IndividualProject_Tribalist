// import React, { useState } from 'react';
// import { Seller } from '../../types/User';
// import { Box, TextField, Button, Typography } from '@mui/material';

// interface Props {
//   onRegister: (data: Seller) => void;
// }

// export const SellerRegisterForm: React.FC<Props> = ({ onRegister }) => {
//   const [form, setForm] = useState<Seller>({
//     name: '',
//     email: '',
//     password: '',
//     address: '',
//     phoneNumber: '',
//     profileUrl: '',
//     role: 'Seller',
//   });

//   const[loading, setLoading] = useState(false)
//   const handleFileUpload = async(event: { target: { files: any; }; }) =>{
//     const file = event.target.files[0]

//     if(!file) return
//     setLoading(true)
//     const data = new FormData()
//     data.append('file', file)
//     data.append('upload-preset','Sample')
//     data.append('cloud_name','dslyht2lh')

//     const res = await fetch('https://api.cloudinary.com/v1_1/dslyht2lh/image/upload',{
//       method:'POST',
//       body: data
//     })

//     const uploadImageURL = await res.json()
//     console.log(uploadImageURL.url)
//     setLoading(false)
//   }

//   const [errors, setErrors] = useState<Partial<Record<keyof Seller, string>>>({});
//   const [submitted, setSubmitted] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setForm(prev => ({ ...prev, [name]: value }));

//     // Clear error as user types
//     if (errors[name as keyof Seller]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   const validate = () => {
//     const newErrors: Partial<Record<keyof Seller, string>> = {};
//     const strongPasswordRegex =
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8}$/;

//     if (!form.name || !form.name.trim()) newErrors.name = 'Name is required';

//     if (!form.email || !form.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
//       newErrors.email = 'Invalid email format';
//     }

//     if (!form.password) {
//       newErrors.password = 'Password is required';
//     } else if (!strongPasswordRegex.test(form.password)) {
//       newErrors.password =
//         'Password must be exactly 8 characters, A-Z, a-z, number, special char';
//     }

//     if (!form.address || !form.address.trim()) {
//       newErrors.address = 'Address is required';
//     }

//     if (!form.phoneNumber || !form.phoneNumber.trim()) {
//       newErrors.phoneNumber = 'Phone Number is required';
//     }

//     if (!form.profileUrl || !form.profileUrl.trim()) {
//       newErrors.profileUrl = 'Profile URL is required';
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
//       <Typography variant="h5" mb={2}>Seller Registration</Typography>

//       <TextField
//         id="name"
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
//         id="email"
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
//         id="password"
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
//         id='phoneNumber'
//         name="phoneNumber"
//         label="Phone Number"
//         fullWidth
//         margin="normal"
//         value={form.phoneNumber}
//         onChange={handleChange}
//         error={submitted && !!errors.phoneNumber}
//         helperText={submitted && errors.phoneNumber}
//       />

//       {/* <TextField
//         id='profileUrl'
//         name="profileUrl"
//         label="Profile Image URL"
//         fullWidth
//         margin="normal"
//         value={form.profileUrl}
//         onChange={handleChange}
//         error={submitted && !!errors.profileUrl}
//         helperText={submitted && errors.profileUrl}
//       /> */}
//       <input
//         type='file'
//         className='file-input'
//         onChange={handleFileUpload}>
//       </input>

//       <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
//         Register as Seller
//       </Button>
//     </Box>
//   );
// };
import React, { useState } from 'react';
import { Seller } from '../../types/User';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Container,
  InputAdornment,
  IconButton,
  Grid,
  alpha,
  LinearProgress,
  Chip,
  Card,
  CardContent,
  Avatar,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Home as HomeIcon,
  Phone as PhoneIcon,
  Visibility,
  VisibilityOff,
  Store as StoreIcon,
  CloudUpload as UploadIcon,
  Image as ImageIcon,
  CheckCircle as CheckIcon
} from '@mui/icons-material';

interface Props {
  onRegister: (data: Seller) => void;
}

export const SellerRegisterForm: React.FC<Props> = ({ onRegister }) => {
  const [form, setForm] = useState<Seller>({
    name: '',
    email: '',
    password: '',
    address: '',
    phoneNumber: '',
    profileUrl: '',
    role: 'Seller',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [errors, setErrors] = useState<Partial<Record<keyof Seller, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setErrors(prev => ({ ...prev, profileUrl: 'Please select a valid image file' }));
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, profileUrl: 'Image size should be less than 5MB' }));
      return;
    }

    setLoading(true);
    setUploadProgress(0);

    try {
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', 'Sample');
      data.append('cloud_name', 'dslyht2lh');

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 200);

      const res = await fetch('https://api.cloudinary.com/v1_1/dslyht2lh/image/upload', {
        method: 'POST',
        body: data
      });

      const uploadResult = await res.json();
      
      clearInterval(progressInterval);
      setUploadProgress(100);

      if (uploadResult.url) {
        setForm(prev => ({ ...prev, profileUrl: uploadResult.url }));
        setImagePreview(uploadResult.url);
        setErrors(prev => ({ ...prev, profileUrl: '' }));
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      setErrors(prev => ({ ...prev, profileUrl: 'Failed to upload image. Please try again.' }));
      setUploadProgress(0);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));

    // Clear error as user types
    if (errors[name as keyof Seller]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Partial<Record<keyof Seller, string>> = {};
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8}$/;

    if (!form.name || !form.name.trim()) {
      newErrors.name = 'Business/Artisan name is required';
    }

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
      newErrors.address = 'Business address is required';
    }

    if (!form.phoneNumber || !form.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\+?[\d\s-()]{10,}$/.test(form.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    if (!form.profileUrl || !form.profileUrl.trim()) {
      newErrors.profileUrl = 'Profile image is required';
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
    if (form.phoneNumber.trim()) completed++;
    if (form.profileUrl.trim()) completed++;
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
          ${alpha('#FFF3E0', 0.9)} 0%, 
          ${alpha('#FFE0B2', 0.7)} 50%, 
          ${alpha('#FFCC80', 0.9)} 100%)`,
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
              <StoreIcon sx={{ fontSize: 32, color: '#D84315' }} />
            </Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: '#3E2723',
                mb: 1
              }}
            >
              Become an Artisan
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: '#6D4C41', mb: 2 }}
            >
              Share your craft with the world and build your business
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
                  sx={{ 
                    bgcolor: alpha('#D84315', 0.1),
                    color: '#D84315'
                  }}
                />
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={getCompletedFields()} 
                sx={{ 
                  height: 6, 
                  borderRadius: 3,
                  bgcolor: alpha('#D84315', 0.1),
                  '& .MuiLinearProgress-bar': {
                    bgcolor: '#D84315'
                  }
                }}
              />
            </Box>
          </Box>

          {/* Registration Form */}
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Profile Image Upload */}
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
                  <ImageIcon sx={{ mr: 1, color: '#D84315' }} />
                  Profile Image
                </Typography>
                
                <Card 
                  sx={{ 
                    border: `2px dashed ${alpha('#D84315', 0.3)}`,
                    borderRadius: 2,
                    bgcolor: alpha('#D84315', 0.02),
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: '#D84315',
                      bgcolor: alpha('#D84315', 0.05)
                    }
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', py: 3 }}>
                    {imagePreview ? (
                      <Box>
                        <Avatar
                          src={imagePreview}
                          sx={{ 
                            width: 100, 
                            height: 100, 
                            mx: 'auto', 
                            mb: 2,
                            border: `3px solid ${alpha('#D84315', 0.2)}`
                          }}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                          <CheckIcon sx={{ color: '#4caf50', fontSize: 20 }} />
                          <Typography color="success.main" variant="body2">
                            Image uploaded successfully
                          </Typography>
                        </Box>
                      </Box>
                    ) : (
                      <Box>
                        {loading ? (
                          <Box>
                            <CircularProgress 
                              variant="determinate" 
                              value={uploadProgress}
                              sx={{ mb: 2, color: '#D84315' }}
                            />
                            <Typography color="text.secondary">
                              Uploading... {uploadProgress}%
                            </Typography>
                          </Box>
                        ) : (
                          <Box>
                            <UploadIcon sx={{ fontSize: 48, color: alpha('#D84315', 0.5), mb: 2 }} />
                            <Typography variant="h6" color="text.secondary" gutterBottom>
                              Upload Your Profile Image
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                              Click to select or drag and drop an image
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Supports JPG, PNG up to 5MB
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    )}
                    
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        opacity: 0,
                        cursor: 'pointer'
                      }}
                      disabled={loading}
                    />
                  </CardContent>
                </Card>
                
                {submitted && errors.profileUrl && (
                  <Alert severity="error" sx={{ mt: 1 }}>
                    {errors.profileUrl}
                  </Alert>
                )}
              </Grid>

              {/* Business Information */}
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
                  <PersonIcon sx={{ mr: 1, color: '#D84315' }} />
                  Business Information
                </Typography>
              </Grid>

              <Grid>
                <TextField
                  name="name"
                  label="Business/Artisan Name"
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
                  <PhoneIcon sx={{ mr: 1, color: '#D84315' }} />
                  Contact Information
                </Typography>
              </Grid>

              <Grid>
                <TextField
                  name="address"
                  label="Business Address"
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
              </Grid>

              <Grid>
                <TextField
                  name="phoneNumber"
                  label="Phone Number"
                  fullWidth
                  value={form.phoneNumber}
                  onChange={handleChange}
                  error={submitted && !!errors.phoneNumber}
                  helperText={submitted && errors.phoneNumber}
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
              </Grid>

              {/* Submit Button */}
              <Grid>
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  size="large"
                  disabled={loading}
                  sx={{
                    mt: 2,
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
                    },
                    '&:disabled': {
                      bgcolor: alpha('#D84315', 0.5),
                      color: 'white'
                    }
                  }}
                >
                  {loading ? 'Creating Account...' : 'Create Artisan Account'}
                </Button>
              </Grid>
            </Grid>
          </Box>

          {/* Footer */}
          <Box sx={{ textAlign: 'center', mt: 3, pt: 3, borderTop: `1px solid ${alpha('#6D4C41', 0.1)}` }}>
            <Typography variant="body2" color="text.secondary">
              By registering as an artisan, you agree to our Terms of Service and Privacy Policy
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};