import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { RecentOrder } from "../../types/Dashboard";

interface Props {
  orders: RecentOrder[];
}

const RecentOrders: React.FC<Props> = ({ orders }) => {
  return (
    <Box mt={4}>
      <Typography variant="h6">Recent Orders</Typography>
      {orders.map(order => (
        <Card key={order.id} sx={{ my: 1 }}>
          <CardContent>
            <Typography>{order.name} - ${order.totalAmount} ({order.status})</Typography>
            <Typography variant="body2">
              {new Date(order.createdAt).toLocaleDateString()}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default RecentOrders;
