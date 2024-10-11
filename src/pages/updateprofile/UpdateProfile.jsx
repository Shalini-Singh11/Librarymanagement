import { useState, useEffect } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Header from "../../layouts/header/Header";
import { toast } from 'react-toastify';
import apiService from '../../services/ApiServices'; 

const UpdateProfile = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const [userProfile, setUserProfile] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/auth/user/${localStorage.getItem('userid')}/`, {
          method: 'GET',
          headers: {
            'Authorization': `Token ${localStorage.getItem("Token")}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const updatedProfile = await response.json();
          setUserProfile(updatedProfile);
        } else {
          const errorData = await response.json();
          console.error('Error fetching profile:', errorData);
          toast.error(errorData.error || "Failed to fetch profile. Please try again.");
        }
      } catch (error) {
        console.error('Network error:', error);
        toast.error("Network error. Please try again.");
      }
    };

    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ["first_name", "last_name", "email", "phone"];

    requiredFields.forEach((field) => {
      if (!userProfile[field]) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });

    if (userProfile.email && !/\S+@\S+\.\S+/.test(userProfile.email)) {
      newErrors.email = "Email address is invalid";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        const response = await apiService.update(`api/auth/user/${localStorage.getItem("userid")}/`, userProfile);

        if (response.ok) {
          const updatedProfile = await response.json();
          localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
          toast.success("Profile updated successfully!");
          navigate("/profile");
        } else {
          const errorData = await response.json();
          console.error('Error updating profile:', errorData);
          toast.error(errorData.error || "Failed to update profile. Please try again.");
        }
      } catch (error) {
        console.error('Network error:', error);
        toast.error("Network error. Please try again.");
      }
    }
  };

  const fields = [
    { label: "First Name", name: "first_name", value: userProfile.first_name },
    { label: "Last Name", name: "last_name", value: userProfile.last_name },
    { label: "Email", name: "email", value: userProfile.email },
    { label: "Phone", name: "phone", value: userProfile.phone },
  ];

  return (
    <Box m="20px">
      <Header title="Update Profile" subtitle="Form For Update Your Profile" />

      <Box
        p={3}
        sx={{
          maxWidth: 800,
          mt: 5,
          backgroundColor: theme.palette.mode === "dark" ? "#1F2A40" : "#f0f0f0",
          borderRadius: "8px",
          color: theme.palette.mode === "dark" ? "white" : "black",
        }}
      >
        <form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <TextField
              key={field.name}
              label={field.label}
              name={field.name}
              variant="outlined"
              fullWidth
              margin="normal"
              value={field.value}
              onChange={handleInputChange}
              error={!!errors[field.name]}
              helperText={errors[field.name]}
              InputLabelProps={{
                sx: {
                  color: theme.palette.mode === "dark" ? "white" : "black",
                  "&.Mui-focused": {
                    color: theme.palette.mode === "dark" ? "white" : "black",
                  },
                },
              }}
              InputProps={{
                sx: {
                  backgroundColor: theme.palette.mode === "dark" ? "#2E3B55" : "white",
                },
              }}
            />
          ))}
          {errors.submit && (
            <Box color="red" mt={2}>
              {errors.submit}
            </Box>
          )}
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            type="submit"
          >
            Save
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default UpdateProfile;
