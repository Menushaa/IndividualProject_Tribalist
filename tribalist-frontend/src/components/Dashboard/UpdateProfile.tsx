import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Avatar,
  IconButton,
  CircularProgress,
  useTheme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useForm } from "react-hook-form";
import { getSellerProfile, updateSellerProfile } from "../../services/authService";

interface UpdateProfileForm {
  name: string;
  email: string;
  address: string;
  phone: string;
  profileImage?: File | null;
}

const UpdateProfile: React.FC = () => {
  const theme = useTheme();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [sellerId] = useState<number>(1); // TODO: Replace with logged-in seller ID

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateProfileForm>();

  // ✅ Fetch current seller details
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getSellerProfile(sellerId);
        if (data) {
          setValue("name", data.name);
          setValue("email", data.email);
          setValue("address", data.address);
          setValue("phone", data.phone);
          setProfileImage(data.profileImage || null);
        }
      } catch (error) {
        console.error("Failed to fetch profile", error);
        alert("Failed to load profile details.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sellerId, setValue]);

  // ✅ Handle profile image change
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
      setValue("profileImage", file);
    }
  };

  // ✅ Submit updated data
  const onSubmit = async (formData: UpdateProfileForm) => {
    try {
      setLoading(true);
      const updatedData = new FormData();
      updatedData.append("name", formData.name);
      updatedData.append("email", formData.email);
      updatedData.append("address", formData.address);
      updatedData.append("phone", formData.phone);

      if (formData.profileImage) {
        updatedData.append("profileImage", formData.profileImage);
      }

      const result = await updateSellerProfile(sellerId, updatedData);
      if (result) {
        alert("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Failed to update profile", error);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" p={3}>
      <Card
        sx={{
          maxWidth: 600,
          width: "100%",
          p: 3,
          borderRadius: 4,
          boxShadow: 6,
          bgcolor: "#FFF8F0",
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              color: "#8B4513",
            }}
          >
            Update Profile
          </Typography>

          {/* Profile Image */}
          <Box display="flex" justifyContent="center" mb={3} position="relative">
            <Avatar
              src={profileImage || "/default-profile.png"}
              alt="Profile"
              sx={{
                width: 110,
                height: 110,
                boxShadow: 3,
                border: "3px solid #f5f5f5",
              }}
            />
            <IconButton
              component="label"
              sx={{
                position: "absolute",
                bottom: 0,
                right: "calc(50% - 55px)",
                bgcolor: "#fff",
                boxShadow: 3,
                border: "1px solid #ddd",
                "&:hover": { bgcolor: "#E07A5F" },
              }}
            >
              <EditIcon sx={ {color:"#8B4513",} }/>
              <input type="file" hidden accept="image/*" onChange={handleImageChange} />
            </IconButton>
          </Box>

          <form onSubmit={handleSubmit(onSubmit)} style={{}}>
            {/* Name */}
            <TextField
              placeholder="Name"
              fullWidth
              margin="normal"
              {...register("name", { required: "Name is required" })}
              error={!!errors.name}
              helperText={errors.name?.message}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#E07A5F",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#E07A5F",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#E07A5F",
                },
              }}
            />

            {/* Email */}
            <TextField
              placeholder="Email"
              fullWidth
              margin="normal"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#E07A5F",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#E07A5F",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#E07A5F",
                },
              }}
            />

            {/* Address */}
            <TextField
              placeholder="Address"
              fullWidth
              margin="normal"
              {...register("address", { required: "Address is required" })}
              error={!!errors.address}
              helperText={errors.address?.message}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#E07A5F",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#E07A5F",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#E07A5F",
                },
              }}
            />

            {/* Phone */}
            <TextField
              placeholder="Phone Number"
              fullWidth
              margin="normal"
              {...register("phone", {
                required: "Phone number is required",
                pattern: { value: /^[0-9]{10}$/, message: "Enter a valid 10-digit number" },
              })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#E07A5F",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#E07A5F",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#E07A5F",
                },
              }}
            />
            <Button
              type="submit"
              fullWidth
              sx={{
                fontWeight: "bold",
                fontSize: "1rem",
                borderRadius: 2,
                textTransform: "none",
                bgcolor: "#8B4513",
                color: "#fff",
                mt: 2,
                "&:hover": {
                  bgcolor: "#A0522D",
                },
              }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UpdateProfile;
