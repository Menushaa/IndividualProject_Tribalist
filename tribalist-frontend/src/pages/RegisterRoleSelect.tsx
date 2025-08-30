// import React from 'react';
// import { Box, Button, Paper, Typography, Grid } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import CustomerImage from '../assets/Customer.png';
// import ArtisanImage from '../assets/Artisan.png';

// const boxStyle = {
//   p: 3,
//   borderRadius: 2,
//   textAlign: 'center',
//   boxShadow: 3,
// };

// export default function RegisterRoleSelect() {
//   const navigate = useNavigate();

//   return (
//     <Box sx={{ maxWidth: 900, mx: 'auto', mt: 6 }}>
//       <Typography variant="h4" textAlign="center" mb={4}>
//         Select Your Role
//       </Typography>

//       <Grid container spacing={4}>
//         {/* Customer */}
//         <Grid>
//           <Paper sx={boxStyle}>
//             <img src={CustomerImage} alt="Customer" width="100%" height={180} style={{ objectFit: 'contain' }} />
//             <Typography variant="h6" mt={2}>
//               I am a Customer
//             </Typography>
//             <Button
//               variant="contained"
//               fullWidth
//               sx={{ mt: 2 }}
//               onClick={() => navigate('/register/customer')}
//             >
//               Register Customer
//             </Button>
//           </Paper>
//         </Grid>

//         {/* Artisan */}
//         <Grid>
//           <Paper sx={boxStyle}>
//             <img src={ArtisanImage} alt="Artisan" width="100%" height={180} style={{ objectFit: 'contain' }} />
//             <Typography variant="h6" mt={2}>
//               I am an Artisan
//             </Typography>
//             <Button
//               variant="contained"
//               fullWidth
//               sx={{ mt: 2 }}
//               onClick={() => navigate('/register/seller')}
//             >
//               Register Artisan
//             </Button>
//           </Paper>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }
import React from 'react';
import { 
  Box, 
  Button, 
  Paper, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia,
  Chip,
  Container,
  useTheme,
  alpha
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { 
  Palette as ArtisanIcon, 
  ShoppingBag as CustomerIcon,
  Star as StarIcon 
} from '@mui/icons-material';
import CustomerImage from '../assets/Customer.png';
import ArtisanImage from '../assets/Artisan.png';

export default function RegisterRoleSelect() {
  const navigate = useNavigate();
  const theme = useTheme();

  const roleCards = [
    {
      type: 'customer',
      title: 'I am a Customer',
      subtitle: 'Discover Authentic Handicrafts',
      description: 'Browse and purchase unique handmade items from talented artisans across the country',
      image: CustomerImage,
      route: '/register/customer',
      icon: <CustomerIcon sx={{ fontSize: 32 }} />,
      color: '#2E7D32', // Deep green
      features: ['Browse Collections', 'Rate & Review', 'Secure Shopping', 'Direct Communication']
    },
    {
      type: 'artisan',
      title: 'I am an Artisan',
      subtitle: 'Share Your Craft with the World',
      description: 'Showcase and sell your handmade creations to customers who appreciate authentic craftsmanship',
      image: ArtisanImage,
      route: '/register/seller',
      icon: <ArtisanIcon sx={{ fontSize: 32 }} />,
      color: '#D84315', // Warm terracotta
      features: ['Create Store', 'Upload Products', 'Track Orders', 'Customer Analytics']
    }
  ];

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        background: `linear-gradient(135deg, 
          ${alpha('#FFF8E1', 0.8)} 0%, 
          ${alpha('#F3E5AB', 0.6)} 50%, 
          ${alpha('#E8D5B7', 0.8)} 100%)`,
        py: 6
      }}
    >
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 700,
              color: '#3E2723',
              mb: 2,
              fontSize: { xs: '2rem', md: '3rem' }
            }}
          >
            Welcome to Tribalist
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#5D4037',
              mb: 1,
              fontWeight: 400
            }}
          >
            Connecting Artisans with Craft Enthusiasts
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#6D4C41',
              maxWidth: 600,
              mx: 'auto'
            }}
          >
            Choose your role to begin your journey in our vibrant handicraft marketplace
          </Typography>
        </Box>

        {/* Role Selection Cards */}
        <Grid container spacing={4} justifyContent="center">
          {roleCards.map((role) => (
            <Grid>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 3,
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  border: `2px solid transparent`,
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 16px 40px ${alpha(role.color, 0.2)}`,
                    border: `2px solid ${alpha(role.color, 0.3)}`,
                  }
                }}
              >
                {/* Card Header with Image */}
                <Box 
                  sx={{ 
                    position: 'relative',
                    height: 200,
                    background: `linear-gradient(45deg, ${alpha(role.color, 0.1)}, ${alpha(role.color, 0.05)})`
                  }}
                >
                  <CardMedia
                    component="img"
                    image={role.image}
                    alt={role.title}
                    sx={{
                      height: '100%',
                      objectFit: 'contain',
                      p: 2
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      bgcolor: alpha(role.color, 0.1),
                      borderRadius: '50%',
                      p: 1,
                      color: role.color
                    }}
                  >
                    {role.icon}
                  </Box>
                </Box>

                {/* Card Content */}
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      fontWeight: 600,
                      color: '#3E2723',
                      mb: 1
                    }}
                  >
                    {role.title}
                  </Typography>
                  
                  <Typography 
                    variant="subtitle1" 
                    sx={{ 
                      color: role.color,
                      fontWeight: 500,
                      mb: 2
                    }}
                  >
                    {role.subtitle}
                  </Typography>

                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: '#5D4037',
                      mb: 3,
                      lineHeight: 1.6
                    }}
                  >
                    {role.description}
                  </Typography>

                  {/* Features */}
                  <Box sx={{ mb: 3 }}>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontWeight: 500,
                        color: '#3E2723',
                        mb: 1
                      }}
                    >
                      What you can do:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {role.features.map((feature, index) => (
                        <Chip
                          key={index}
                          label={feature}
                          size="small"
                          sx={{
                            bgcolor: alpha(role.color, 0.1),
                            color: role.color,
                            fontSize: '0.75rem',
                            height: 24
                          }}
                        />
                      ))}
                    </Box>
                  </Box>

                  {/* Action Button */}
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    onClick={() => navigate(role.route)}
                    sx={{
                      bgcolor: role.color,
                      borderRadius: 2,
                      py: 1.5,
                      fontWeight: 600,
                      textTransform: 'none',
                      fontSize: '1rem',
                      boxShadow: `0 4px 12px ${alpha(role.color, 0.3)}`,
                      '&:hover': {
                        bgcolor: role.color,
                        boxShadow: `0 6px 16px ${alpha(role.color, 0.4)}`,
                        transform: 'translateY(-1px)'
                      }
                    }}
                  >
                    Get Started as {role.type === 'customer' ? 'Customer' : 'Artisan'}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Bottom Section */}
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, mb: 2 }}>
            <StarIcon sx={{ color: '#FFB300' }} />
            <Typography variant="body2" color="text.secondary">
              Join thousands of satisfied customers and talented artisans
            </Typography>
            <StarIcon sx={{ color: '#FFB300' }} />
          </Box>
          <Typography variant="body2" color="text.secondary">
            Already have an account?{' '}
            <Button 
              variant="text" 
              onClick={() => navigate('/login')}
              sx={{ 
                textDecoration: 'underline',
                color: '#D84315',
                fontWeight: 500
              }}
            >
              Sign In Here
            </Button>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}