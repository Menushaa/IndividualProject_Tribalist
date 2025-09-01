import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { RecentOrder } from "../../types/Dashboard";

interface Props {
  orders: RecentOrder[];
}

const RecentOrders: React.FC<Props> = ({ orders }) => {
  return (
    <Box mt={4}>
      <Typography variant="h6" mb={2}>
        Recent Orders
      </Typography>
      {orders.length === 0 ? (
        <Typography>No recent orders</Typography>
      ) : (
        orders.map((order) => (
          <Card key={order.id} sx={{ mb: 2, bgcolor: "#fff", borderRadius: "10px", boxShadow: 2 }}>
            <CardContent>
              {/* Customer Name */}
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {order.name}
              </Typography>

              {/* Item Name */}
              <Typography variant="body1" color="text.secondary">
                Item: {order.item}
              </Typography>

              {/* Amount */}
              <Typography variant="body1" color="primary" sx={{ mt: 1 }}>
                Rs. {order.amount.toLocaleString()}
              </Typography>

              {/* Status */}
              <Typography variant="body2" sx={{ mt: 1 }}>
                Status:{" "}
                <span
                  style={{
                    color:
                      order.status === "Completed"
                        ? "green"
                        : order.status === "Pending"
                        ? "orange"
                        : "red",
                    fontWeight: "bold",
                  }}
                >
                  {order.status}
                </span>
              </Typography>

              {/* Date */}
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {new Date(order.date).toLocaleDateString()}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default RecentOrders;
