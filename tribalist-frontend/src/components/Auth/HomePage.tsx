import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Card,
  CardMedia,
  CardContent,
  Box,
  TextField,
  InputAdornment,
  Chip,
  Rating,
  IconButton,
  Menu,
  MenuItem,
  Badge,
  Avatar,
  Fab,
  Paper,
  Divider,
  Grid
} from '@mui/material';
import {
  Search,
  ShoppingCart,
  Favorite,
  Share,
  AccountCircle,
  FilterList,
  Star,
  TrendingUp,
  Handshake,
  LocalShipping,
  Security,
  KeyboardArrowUp
} from '@mui/icons-material';

export default function TribalistHomepage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Mock data for featured products
  const featuredProducts = [
    {
      id: 1,
      name: 'Handwoven Silk Scarf',
      artisan: 'Maya Patel',
      price: 2499,
      originalPrice: 3199,
      image: 'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=300&h=300&fit=crop',
      rating: 4.8,
      reviews: 156,
      category: 'Textiles',
      isNew: true
    },
    {
      id: 2,
      name: 'Ceramic Tea Set',
      artisan: 'Ravi Kumar',
      price: 1899,
      originalPrice: 2299,
      image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=300&h=300&fit=crop',
      rating: 4.6,
      reviews: 89,
      category: 'Pottery',
      isBestseller: true
    },
    {
      id: 3,
      name: 'Wooden Jewelry Box',
      artisan: 'Lakshmi Devi',
      price: 1299,
      originalPrice: 1599,
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop',
      rating: 4.9,
      reviews: 234,
      category: 'Woodwork',
      isNew: false
    },
    {
      id: 4,
      name: 'Brass Decorative Bowl',
      artisan: 'Suresh Singh',
      price: 899,
      originalPrice: 1199,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop',
      rating: 4.7,
      reviews: 67,
      category: 'Metalwork',
      isBestseller: false
    },
    {
      id: 5,
      name: 'Embroidered Cushion Cover',
      artisan: 'Priya Sharma',
      price: 699,
      originalPrice: 899,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop',
      rating: 4.5,
      reviews: 123,
      category: 'Textiles',
      isNew: true
    },
    {
      id: 6,
      name: 'Bamboo Wind Chime',
      artisan: 'Anita Roy',
      price: 549,
      originalPrice: 749,
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=300&fit=crop',
      rating: 4.4,
      reviews: 78,
      category: 'Bamboo Craft',
      isBestseller: false
    }
  ];

  const categories = [
    { name: 'Textiles', icon: '🧵', count: 245 },
    { name: 'Pottery', icon: '🏺', count: 189 },
    { name: 'Woodwork', icon: '🪵', count: 156 },
    { name: 'Metalwork', icon: '⚒️', count: 134 },
    { name: 'Jewelry', icon: '💎', count: 298 },
    { name: 'Paintings', icon: '🎨', count: 167 }
  ];

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Simulate scroll listener
  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#fafafa' }}>
      {/* Header */}
      <AppBar position="sticky" sx={{ bgcolor: '#2c3e50', boxShadow: '0 2px 20px rgba(0,0,0,0.1)' }}>
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', color: '#f39c12', fontFamily: "Patrick Hand", }}>
            Tribalist
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <TextField
              size="small"
              placeholder="Search handicrafts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: 'grey.500' }} />
                  </InputAdornment>
                ),
                sx: {
                  bgcolor: 'white',
                  borderRadius: 3,
                  width: 300,
                  '& .MuiOutlinedInput-notchedOutline': { border: 'none' }
                }
              }}
            />
            
            <IconButton color="inherit">
              <Badge badgeContent={3} color="error">
                <ShoppingCart />
              </Badge>
            </IconButton>
            
            <IconButton
              color="inherit"
              onClick={handleProfileMenuOpen}
            >
              <AccountCircle />
            </IconButton>
            
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleMenuClose}>My Orders</MenuItem>
              <MenuItem onClick={handleMenuClose}>Wishlist</MenuItem>
              <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 8,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid>
              <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                Discover Authentic
                <br />
                <span style={{ color: '#f39c12' }}>Handicrafts</span>
              </Typography>
              <Typography variant="h6" paragraph sx={{ opacity: 0.9, lineHeight: 1.8 }}>
                Connect with talented artisans across the country and bring home unique, handcrafted treasures that tell a story.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: '#f39c12',
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    '&:hover': { bgcolor: '#e67e22' }
                  }}
                >
                  Shop Now
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
                  }}
                >
                  Become an Artisan
                </Button>
              </Box>
            </Grid>
            <Grid>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=600&h=400&fit=crop"
                alt="Handicrafts"
                sx={{
                  width: '100%',
                  height: 400,
                  objectFit: 'cover',
                  borderRadius: 4,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {[
            { icon: <Handshake sx={{ fontSize: 40 }} />, title: 'Direct from Artisans', desc: 'Support local craftspeople directly' },
            { icon: <Security sx={{ fontSize: 40 }} />, title: 'Quality Assured', desc: 'Every product is carefully curated' },
            { icon: <LocalShipping sx={{ fontSize: 40 }} />, title: 'Safe Delivery', desc: 'Secure packaging and fast shipping' },
            { icon: <Star sx={{ fontSize: 40 }} />, title: 'Customer Reviews', desc: 'Honest feedback from buyers' }
          ].map((feature, index) => (
            <Grid key={index}>
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  height: '100%',
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'translateY(-5px)' }
                }}
              >
                <Box sx={{ color: '#f39c12', mb: 2 }}>
                  {feature.icon}
                </Box>
                <Typography variant="h6" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.desc}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Categories Section */}
      <Box sx={{ bgcolor: 'white', py: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 'bold', mb: 5 }}>
            Shop by Category
          </Typography>
          <Grid container spacing={3}>
            {categories.map((category, index) => (
              <Grid key={index}>
                <Paper
                  elevation={2}
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.15)'
                    }
                  }}
                >
                  <Typography variant="h3" sx={{ mb: 2 }}>
                    {category.icon}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {category.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {category.count} items
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Featured Products */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
            Featured Products
          </Typography>
          <Button
            variant="outlined"
            startIcon={<FilterList />}
            sx={{ borderRadius: 3 }}
          >
            Filter
          </Button>
        </Box>

        <Grid container spacing={3}>
          {featuredProducts.map((product) => (
            <Grid key={product.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'translateY(-5px)' },
                  position: 'relative'
                }}
              >
                {(product.isNew || product.isBestseller) && (
                  <Chip
                    label={product.isNew ? 'New' : 'Bestseller'}
                    color={product.isNew ? 'secondary' : 'primary'}
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 10,
                      left: 10,
                      zIndex: 1,
                      fontWeight: 'bold'
                    }}
                  />
                )}
                
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="250"
                    image={product.image}
                    alt={product.name}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1
                    }}
                  >
                    <IconButton
                      size="small"
                      sx={{
                        bgcolor: 'rgba(255,255,255,0.9)',
                        '&:hover': { bgcolor: 'rgba(255,255,255,1)' }
                      }}
                    >
                      <Favorite />
                    </IconButton>
                    <IconButton
                      size="small"
                      sx={{
                        bgcolor: 'rgba(255,255,255,0.9)',
                        '&:hover': { bgcolor: 'rgba(255,255,255,1)' }
                      }}
                    >
                      <Share />
                    </IconButton>
                  </Box>
                </Box>

                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                    {product.name}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    by {product.artisan}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Rating value={product.rating} precision={0.1} size="small" readOnly />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                      ({product.reviews})
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Box>
                      <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                        ₹{product.price.toLocaleString()}
                      </Typography>
                      {product.originalPrice && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ textDecoration: 'line-through' }}
                        >
                          ₹{product.originalPrice.toLocaleString()}
                        </Typography>
                      )}
                    </Box>
                    <Chip
                      label={product.category}
                      size="small"
                      variant="outlined"
                      color="primary"
                    />
                  </Box>

                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<ShoppingCart />}
                    sx={{
                      bgcolor: '#f39c12',
                      '&:hover': { bgcolor: '#e67e22' },
                      borderRadius: 2,
                      py: 1
                    }}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            variant="outlined"
            size="large"
            sx={{ borderRadius: 3, px: 4 }}
          >
            View All Products
          </Button>
        </Box>
      </Container>

      {/* Newsletter Section */}
      <Box sx={{ bgcolor: '#2c3e50', color: 'white', py: 6 }}>
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
              Stay Connected
            </Typography>
            <Typography variant="h6" paragraph sx={{ opacity: 0.8 }}>
              Get updates on new artisans, exclusive deals, and craft stories
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 3 }}>
              <TextField
                placeholder="Enter your email"
                variant="outlined"
                sx={{
                  bgcolor: 'white',
                  borderRadius: 2,
                  minWidth: 300,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { border: 'none' }
                  }
                }}
              />
              <Button
                variant="contained"
                sx={{
                  bgcolor: '#f39c12',
                  '&:hover': { bgcolor: '#e67e22' },
                  px: 4,
                  borderRadius: 2
                }}
              >
                Subscribe
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: '#34495e', color: 'white', py: 4 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#f39c12' }}>
                Tribalist
              </Typography>
              <Typography variant="body2" paragraph>
                Connecting artisans with customers nationwide, preserving traditional crafts for future generations.
              </Typography>
            </Grid>
            <Grid>
              <Grid container spacing={4}>
                <Grid>
                  <Typography variant="h6" gutterBottom>About</Typography>
                  <Typography variant="body2">Our Story</Typography>
                  <Typography variant="body2">Artisans</Typography>
                  <Typography variant="body2">Impact</Typography>
                </Grid>
                {/* <Grid >   item xs={6} md={3}> */}
                <Grid>
                  <Typography variant="h6" gutterBottom>Support</Typography>
                  <Typography variant="body2">Help Center</Typography>
                  <Typography variant="body2">Shipping</Typography>
                  <Typography variant="body2">Returns</Typography>
                </Grid>
                <Grid>
                  <Typography variant="h6" gutterBottom>Sell</Typography>
                  <Typography variant="body2">Become Artisan</Typography>
                  <Typography variant="body2">Seller Tools</Typography>
                  <Typography variant="body2">Guidelines</Typography>
                </Grid>
                <Grid>
                  <Typography variant="h6" gutterBottom>Legal</Typography>
                  <Typography variant="body2">Privacy</Typography>
                  <Typography variant="body2">Terms</Typography>
                  <Typography variant="body2">Cookies</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Divider sx={{ my: 3, bgcolor: 'rgba(255,255,255,0.2)' }} />
          <Typography variant="body2" align="center" color="rgba(255,255,255,0.7)">
            © 2025 Tribalist. All rights reserved. Made with ❤️ for artisans.
          </Typography>
        </Container>
      </Box>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Fab
          color="primary"
          size="small"
          onClick={scrollToTop}
          sx={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            bgcolor: '#f39c12',
            '&:hover': { bgcolor: '#e67e22' }
          }}
        >
          <KeyboardArrowUp />
        </Fab>
      )}
    </Box>
  );
}