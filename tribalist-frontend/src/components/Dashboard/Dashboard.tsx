import React from "react";
import { Box, Typography } from "@mui/material";
import DashboardCards from "./DashboardCards";

const Dashboard: React.FC = () => {
  const dummyData = {
    totalRevenue: 125000,
    totalItems: 48,
    totalOrders: 320,
    totalCustomers: 150,
  };

  return (
    <Box
      sx={{
        p: 3,
        bgcolor: "#fff",
        minHeight: "100vh",
        borderRadius: "12px",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          mb: 3,
          color: "#333",
          textAlign: "center",
        }}
      >
        Seller Dashboard Overview
      </Typography>

      <DashboardCards
        totalRevenue={dummyData.totalRevenue}
        totalItems={dummyData.totalItems}
        totalOrders={dummyData.totalOrders}
        totalCustomers={dummyData.totalCustomers}
      />
    </Box>
  );
};

export default Dashboard;
