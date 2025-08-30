import React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";

interface Props {
  totalRevenue: number;
  totalItems: number;
  totalOrders: number;
  totalCustomers: number;
}

const DashboardCards: React.FC<Props> = ({ totalRevenue, totalItems, totalOrders, totalCustomers }) => {
  return (
    <Grid container spacing={2}>
      <Grid>
        <Card><CardContent><Typography>Total Revenue</Typography><Typography>${totalRevenue}</Typography></CardContent></Card>
      </Grid>
      <Grid>
        <Card><CardContent><Typography>Total Items</Typography><Typography>{totalItems}</Typography></CardContent></Card>
      </Grid>
      <Grid>
        <Card><CardContent><Typography>Total Orders</Typography><Typography>{totalOrders}</Typography></CardContent></Card>
      </Grid>
      <Grid>
        <Card><CardContent><Typography>Total Customers</Typography><Typography>{totalCustomers}</Typography></CardContent></Card>
      </Grid>
    </Grid>
  );
};

export default DashboardCards;
