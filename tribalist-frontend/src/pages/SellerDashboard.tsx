import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { DashboardData } from "../types/Dashboard";
import { getSellerDashboard } from "../services/authService";
import DashboardCards from "../components/Dashboard/DashboardCards";
import RecentOrders from "../components/Dashboard/RecentOrders";

const SellerDashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    getSellerDashboard(1) // TODO: replace with logged-in sellerId from auth
      .then(setData)
      .catch(err => console.error(err));
  }, []);

  if (!data) return <Typography>Loading...</Typography>;

  return (
    <Box p={3}>
      <Typography variant="h4" mb={2}>Seller Dashboard</Typography>
      <DashboardCards
        totalRevenue={data.totalRevenue}
        totalItems={data.totalItems}
        totalOrders={data.totalOrders}
        totalCustomers={data.totalCustomers}
      />
      <RecentOrders orders={data.recentOrders} />
    </Box>
  );
};

export default SellerDashboard;
