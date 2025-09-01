import React, { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
  Chip,
  alpha,
} from "@mui/material";
import { RecentOrder } from "../../types/Dashboard";

const dummyOrders: RecentOrder[] = [
  {
    id: 1,
    name: "John Doe",
    item: "Handmade Pottery",
    date: "2025-08-28",
    status: "Completed",
    amount: 2500,
  },
  {
    id: 2,
    name: "Sarah Smith",
    item: "Traditional Necklace",
    date: "2025-08-27",
    status: "Pending",
    amount: 4500,
  },
  {
    id: 3,
    name: "Michael Johnson",
    item: "Wooden Sculpture",
    date: "2025-08-25",
    status: "Cancelled",
    amount: 3200,
  },
  {
    id: 4,
    name: "Emma Brown",
    item: "Handwoven Saree",
    date: "2025-08-24",
    status: "Completed",
    amount: 6800,
  },
  {
    id: 5,
    name: "David Wilson",
    item: "Batik Painting",
    date: "2025-08-23",
    status: "Pending",
    amount: 5200,
  },
];

const SellerOrdersPage: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredOrders = dummyOrders.filter(
    (order) =>
      order.name.toLowerCase().includes(search.toLowerCase()) ||
      order.item.toLowerCase().includes(search.toLowerCase()) ||
      order.status.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "success";
      case "Pending":
        return "warning";
      case "Cancelled":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Box>
      {/* Page Title */}
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
        Orders List
      </Typography>

      {/* Search Box */}
      <TextField
        label="Search orders..."
        variant="outlined"
        fullWidth
        sx={{  mb: 2,
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor: "#E07A5F", // Hover border
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#E07A5F", // Focused border
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#E07A5F", // Label color when focused
              },
         }}
        value={search}
        onChange={(e) => setSearch(e.target.value) }
      />

      {/* Orders Table */}
      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
        <Table>
          <TableHead sx={{ bgcolor: "#fddebdff" }}>
            <TableRow>
              <TableCell sx={{ color: "#4B3832", fontWeight: "bold" }}>#</TableCell>
              <TableCell sx={{ color: "#4B3832", fontWeight: "bold" }}>Customer</TableCell>
              <TableCell sx={{ color: "#4B3832", fontWeight: "bold" }}>Item</TableCell>
              <TableCell sx={{ color: "#4B3832", fontWeight: "bold" }}>Date</TableCell>
              <TableCell sx={{ color: "#4B3832", fontWeight: "bold" }}>Amount</TableCell>
              <TableCell sx={{ color: "#4B3832", fontWeight: "bold" }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((order) => (
                <TableRow key={order.id} hover>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.name}</TableCell>
                  <TableCell>{order.item}</TableCell>
                  <TableCell>
                    {new Date(order.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>Rs. {order.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Chip label={order.status} color={getStatusColor(order.status)} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        component="div"
        count={filteredOrders.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Box>
  );
};

export default SellerOrdersPage;
