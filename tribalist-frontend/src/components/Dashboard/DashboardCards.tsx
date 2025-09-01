import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";

interface Props {
  totalRevenue: number;
  totalItems: number;
  totalOrders: number;
  totalCustomers: number;
}

const DashboardCards: React.FC<Props> = ({ totalRevenue, totalItems, totalOrders, totalCustomers }) => {
  const stats = [
    {
      title: "Total Revenue",
      value: `Rs. ${totalRevenue.toLocaleString()}`,
      icon: <MonetizationOnIcon sx={{ fontSize: 40, color: "#fff" }} />,
      bgColor: "#F4A261", // Warm orange
    },
    {
      title: "Total Items",
      value: totalItems,
      icon: <InventoryIcon sx={{ fontSize: 40, color: "#fff" }} />,
      bgColor: "#2A9D8F", // Teal green
    },
    {
      title: "Total Orders",
      value: totalOrders,
      icon: <ShoppingCartIcon sx={{ fontSize: 40, color: "#fff" }} />,
      bgColor: "#E76F51", // Soft red
    },
    {
      title: "Total Customers",
      value: totalCustomers,
      icon: <PeopleIcon sx={{ fontSize: 40, color: "#fff" }} />,
      bgColor: "#264653", // Dark teal
    },
  ];

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      gap={3}
      mt={3}
      sx={{
        justifyContent: "center",
        bgcolor: "#fff", // Dashboard background
        borderRadius: "12px",
        p: 2,
      }}
    >
      {stats.map((stat) => (
        <Card
          key={stat.title}
          sx={{
            flex: "1 1 230px",
            display: "flex",
            alignItems: "center",
            bgcolor: stat.bgColor,
            color: "#fff",
            borderRadius: "14px",
            boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
            p: 2,
            transition: "transform 0.2s ease-in-out",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
            },
          }}
        >
          <Box sx={{ mr: 2 }}>{stat.icon}</Box>
          <CardContent sx={{ p: 0 }}>
            <Typography variant="subtitle2" sx={{ opacity: 0.9 }}>
              {stat.title}
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              {stat.value}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default DashboardCards;
