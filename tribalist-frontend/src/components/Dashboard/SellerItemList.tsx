import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import {
  getSellerItems,
  addSellerItem,
  updateSellerItem,
  deleteSellerItem,
} from "../../services/authService";

interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string | File;
}

const SellerItems: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [open, setOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [form, setForm] = useState<Item>({
    id: 0,
    name: "",
    description: "",
    price: 0,
    imageUrl: "",
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const data = await getSellerItems(1); // TODO: Replace with logged-in sellerId
      setItems(data);
    } catch (error) {
      console.error("Failed to fetch items", error);
    }
  };

  const handleOpen = (item?: Item) => {
    if (item) {
      setForm(item);
      setEditingItem(item);
    } else {
      setForm({
        id: 0,
        name: "",
        description: "",
        price: 0,
        imageUrl: "",
      });
      setEditingItem(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingItem(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("price", form.price.toString());

      if (form.imageUrl instanceof File) {
        formData.append("image", form.imageUrl); // send file
      } else if (typeof form.imageUrl === "string") {
        formData.append("imageUrl", form.imageUrl); // send URL
      }

      if (editingItem) {
        await updateSellerItem(formData);
      } else {
        await addSellerItem(formData);
      }

      fetchItems();
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };



  const handleDelete = async (id: number) => {
    try {
      await deleteSellerItem(id);
      fetchItems();
    } catch (error) {
      console.error("Failed to delete item", error);
    }
  };

  return (
    <Box p={3}>
      {/* Page Title */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" fontWeight="bold" color="#4B3832">
          My Items
        </Typography>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#E07A5F",
            color: "#FDDEBDFF",
            "&:hover": { bgcolor: "#D35D4B" },
          }}
          onClick={() => handleOpen()}
        >
          + Add Item
        </Button>
      </Box>

      {/* Item Cards */}
      <Box display="flex" flexWrap="wrap" gap={2}>
        {items.map((item) => (
          <Card
            key={item.id}
            sx={{
              width: 280,
              borderRadius: 2,
              backgroundColor: "#FDDEBDFF",
              color: "#4B3832",
              boxShadow: 3,
            }}
          >
            <CardMedia
              component="img"
              height="180"
              image={
                typeof item.imageUrl === "string"
                  ? item.imageUrl || "/placeholder.png"
                  : item.imageUrl instanceof File
                  ? URL.createObjectURL(item.imageUrl)
                  : "/placeholder.png"
              }
              alt={item.name}
              sx={{ objectFit: "cover" }}
            />
            <CardContent>
              <Typography variant="h6" fontWeight="bold" color="#4B3832">
                {item.name}
              </Typography>
              <Typography variant="body2" color="#4B3832">
                {item.description}
              </Typography>
              <Typography mt={1} fontWeight="bold" color="#4B3832">
                Rs. {item.price.toFixed(2)}
              </Typography>
            </CardContent>
            <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                size="small"
                variant="outlined"
                sx={{
                  color: "#E07A5F",
                  borderColor: "#E07A5F",
                  "&:hover": {
                    bgcolor: "#E07A5F",
                    color: "#FDDEBDFF",

                  },
                }}
                onClick={() => handleOpen(item)}
              >
                Edit
              </Button>
              <Button
                size="small"
                variant="outlined"
                sx={{
                  color: "#E07A5F",
                  borderColor: "#E07A5F",
                  "&:hover": {
                    bgcolor: "#E07A5F",
                    color: "#FDDEBDFF",
                  },
                }}
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>

      {/* Add / Edit Item Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ color: "#4B3832" }}>
          {editingItem ? "Edit Item" : "Add New Item"}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Item Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            sx={{
              "& .MuiInputLabel-root": { color: "#E07A5F" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#E07A5F" },
                "&:hover fieldset": { borderColor: "#E07A5F" },
                "&.Mui-focused fieldset": { borderColor: "#E07A5F" },
                "& .MuiInputLabel-root.Mui-focused": {
                borderColor: "#E07A5F", 
              },
              },
            }}
          />
          <TextField
            margin="dense"
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
            sx={{
              "& .MuiInputLabel-root": { color: "#E07A5F" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#E07A5F" },
                "&:hover fieldset": { borderColor: "#E07A5F" },
                "&.Mui-focused fieldset": { borderColor: "#E07A5F" },
                "& .MuiInputLabel-root.Mui-focused": {
                borderColor: "#E07A5F",
              },
              },
            }}
          />
          <TextField
            margin="dense"
            label="Price"
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            fullWidth
            sx={{
              "& .MuiInputLabel-root": { color: "#E07A5F" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#E07A5F" },
                "&:hover fieldset": { borderColor: "#E07A5F" },
                "&.Mui-focused fieldset": { borderColor: "#E07A5F" },
                "& .MuiInputLabel-root.Mui-focused": {
                borderColor: "#E07A5F", 
              },
              },
            }}
          />
          <Box display="flex" flexDirection="column" mb={2}>
            <Typography mb={1} color="#E07A5F">Item Image</Typography>

            {/* Preview */}
            {form.imageUrl && (
              <Box mb={1}>
                <img
                  src={form.imageUrl instanceof File ? URL.createObjectURL(form.imageUrl) : form.imageUrl}
                  alt="Preview"
                  style={{ width: 200, height: 150, objectFit: "cover", borderRadius: 8 }}
                />
              </Box>
            )}

            {/* File input */}
            <Button
              variant="outlined"
              component="label"
              sx={{
                borderColor: "#E07A5F",
                color: "#E07A5F",
                "&:hover": { borderColor: "#4B3832", color: "#4B3832" },
              }}
            >
              Upload Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setForm({ ...form, imageUrl: file });
                  }
                }}
              />
            </Button>
          </Box>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: "#4B3832" }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              bgcolor: "#E07A5F",
              color: "#FDDEBDFF",
              "&:hover": { bgcolor: "#D35D4B" },
            }}
          >
            {editingItem ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SellerItems;
