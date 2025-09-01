import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Topbar: React.FC = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    handleMenuClose();
  };

  const handleLogout = () => {
    // Clear session data or token
    localStorage.removeItem("sellerToken");
    navigate("/login");
    handleMenuClose();
  };

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: "#8B4513", // Handicraft brown color
        color: "#fff",
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Dashboard Title */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            letterSpacing: 1,
            cursor: "pointer",
          }}
          onClick={() => navigate("/dashboard")}
        >
          Tribalist Seller Dashboard
        </Typography>

        {/* Right Side Profile Section */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
            <Avatar
              alt="Seller Profile"
              src="/assets/profile.jpg" // Replace with seller image dynamically if needed
              sx={{
                bgcolor: "#F4A261", // Fallback color
                color: "#fff",
                fontWeight: "bold",
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
              }}
            >
              S
            </Avatar>
          </IconButton>

          {/* Profile Dropdown Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                mt: 1.5,
                minWidth: 180,
                borderRadius: 2,
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                bgcolor: "#fff",
              },
            }}
          >
            <MenuItem onClick={() => handleNavigation("/View Orders")}>
              Profile
            </MenuItem>
            <MenuItem onClick={() => handleNavigation("/my-orders")}>
              My Orders
            </MenuItem>
            <Divider />
            <MenuItem
              onClick={handleLogout}
              sx={{ color: "#E07A5F", fontWeight: "bold" }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
