import React from "react";
import { Box, List, ListItemButton, ListItemText, Typography } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";

interface SidebarProps {
  onSelect: (tab: string) => void;
  selectedTab: string;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelect, selectedTab }) => {
  const menuItems = [
    { label: "Dashboard", icon: <DashboardIcon /> },
    { label: "Update Profile", icon: <AccountCircleIcon /> },
    { label: "Item List", icon: <AddBoxIcon /> },
    { label: "View Orders", icon: <ShoppingCartIcon /> },
    { label: "Logout", icon: <LogoutIcon /> },
  ];

  return (
    <Box
      sx={{
        width: 250,
        height: "100vh",
        bgcolor: "#FFF8F0", // Light artisan background
        color: "#4B3832", // Dark brown text
        display: "flex",
        flexDirection: "column",
        p: 2,
        boxShadow: "2px 0 10px rgba(0,0,0,0.1)",
      }}
    >
      {/* Sidebar Header */}
      <Typography
        variant="h5"
        sx={{
          mb: 3,
          fontWeight: "bold",
          textAlign: "center",
          color: "#8B4513",
          letterSpacing: 1,
        }}
      >
        Seller Panel
      </Typography>

      {/* Menu Items */}
      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.label}
            onClick={() => onSelect(item.label)}
            sx={{
              bgcolor: selectedTab === item.label ? "#E07A5F" : "transparent",
              color: selectedTab === item.label ? "#fff" : "#4B3832",
              borderRadius: "10px",
              mb: 1,
              py: 1.2,
              px: 2,
              fontWeight: selectedTab === item.label ? "bold" : "normal",
              display: "flex",
              alignItems: "center",
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor:
                  selectedTab === item.label ? "#E07A5F" : "#F4A26122",
                color: selectedTab === item.label ? "#fff" : "#8B4513",
                transform: "scale(1.02)",
              },
            }}
          >
            <Box sx={{ color: selectedTab === item.label ? "#fff" : "#8B4513" }}>
              {item.icon}
            </Box>
            <ListItemText
              sx={{
                ml: 2,
                fontWeight: selectedTab === item.label ? "bold" : "medium",
                fontSize: "15px",
              }}
              primary={item.label}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
