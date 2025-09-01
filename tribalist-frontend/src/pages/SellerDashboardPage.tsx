import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import Sidebar from "../components/Layout/Sidebar";
import Topbar from "../components/Layout/Topbar";
import DashboardCards from "../components/Dashboard/DashboardCards";
import RecentOrders from "../components/Dashboard/RecentOrders";
import UpdateProfile from "../components/Dashboard/UpdateProfile";
import SellerItemList from "../components/Dashboard/SellerItemList";
import { DashboardData } from "../types/Dashboard";
import { getSellerDashboard } from "../services/authService";
import SellerOrdersPage from "../components/Dashboard/SellerOrderPage";
import { useNavigate } from "react-router-dom";
const SellerDashboardPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("Dashboard");
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Fetch dashboard data
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const result = await getSellerDashboard(1);
        setData(result);
      } catch (error) {
        console.error("Error fetching dashboard:", error);
        // ✅ Fallback to dummy data
        setData({
          totalRevenue: 125000,
          totalItems: 48,
          totalOrders: 320,
          totalCustomers: 150,
          recentOrders: [
            {
              id: 1,
              name: "John Doe",
              item: "Handcrafted Vase",
              date: "2025-09-01",
              status: "Delivered",
              amount: 4500,
            },
            {
              id: 2,
              name: "Jane Smith",
              item: "Wooden Sculpture",
              date: "2025-08-30",
              status: "Pending",
              amount: 8000,
            },
          ],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  // ✅ Dashboard Content Rendering
  const renderContent = () => {
    if (loading) {
      return (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress />
        </Box>
      );
    }

    switch (selectedTab) {
      case "Dashboard":
        return (
          <>
            <DashboardCards
              totalRevenue={data?.totalRevenue || 0}
              totalItems={data?.totalItems || 0}
              totalOrders={data?.totalOrders || 0}
              totalCustomers={data?.totalCustomers || 0}
            />
            <RecentOrders orders={data?.recentOrders || []} />
          </>
        );

      case "Update Profile":
        return <UpdateProfile />;

      case "Item List":
        return <SellerItemList/>;

      case "View Orders":
        return <SellerOrdersPage/>;

      case "Logout":
        navigate("/login");
        return null;
      default:
        return <Typography variant="h5">Select an option from the sidebar</Typography>;
    }
  };

  return (
    <Box display="flex">
      {/* ✅ Sidebar */}
      <Sidebar selectedTab={selectedTab} onSelect={setSelectedTab} />

      {/* ✅ Main Content */}
      <Box flex={1} bgcolor="#f9fafb" minHeight="100vh">
        <Topbar />
        <Box p={3}>{renderContent()}</Box>
      </Box>
    </Box>
  );
};

export default SellerDashboardPage;
