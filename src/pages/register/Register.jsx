import { useState } from "react";
import PropTypes from "prop-types";
import { TextField, Button, Grid, Box, Typography, Alert, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import register from "../../assets/registerRegister.svg";
import { validateEmail, validatePassword, validatePhone, validateRequiredFields } from "../../validation/validation";
// Styles ======================
import {
  containerStyles,
  cardStyles,
  formContainerStyles,
} from "./style";

const Register = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, phone, email, password, confirmPassword } = formData;

    if (!validateRequiredFields(firstName, lastName, phone, email, password, confirmPassword)) {
      setError("All fields are required.");
      return;
    }

    if (!validatePhone(phone)) {
      setError("Phone number must be a valid 10-digit number.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Invalid email format.");
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 6 characters long and include letters and numbers.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/user/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          phone,
          email,
          password,
          confirm_password: confirmPassword,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Registration failed.");
      }

     
      setSuccessMessage("Registration successful!");
      setError("");
      navigate("/"); 
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ ...containerStyles }}>
      <Grid item xs={12} md={10} lg={8}>
        <Box sx={{ ...cardStyles }}>
          <Grid item xs={12} md={5} sx={{ ...formContainerStyles }}>
            <Box component="form" onSubmit={handleSubmit}>
              <Typography variant="h2" gutterBottom>
                Register
              </Typography>

              {successMessage && (
                <Alert severity="success" sx={{ marginBottom: 2 }}>
                  {successMessage}
                </Alert>
              )}

              {error && (
                <Alert severity="error" sx={{ marginBottom: 2 }}>
                  {error}
                </Alert>
              )}

              <TextField
                fullWidth
                label="First Name"
                variant="outlined"
                margin="normal"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="Last Name"
                variant="outlined"
                margin="normal"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="Phone"
                variant="outlined"
                margin="normal"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="Email Address"
                variant="outlined"
                margin="normal"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                margin="normal"
                name="password"
                value={formData.password}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Confirm Password"
                variant="outlined"
                type={showConfirmPassword ? "text" : "password"}
                margin="normal"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Box mt={2}>
                <Button type="submit" fullWidth variant="contained" color="primary">
                  Register
                </Button>
              </Box>

              <Typography mt={2}>
                Already a member? <a href="/">Login</a>
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={7}>
            <Box><img src={register} width={"100%"} /></Box>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

Register.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Register;
