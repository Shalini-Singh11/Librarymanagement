import { useState } from "react";
import { TextField, Button, Grid, Box, Typography, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/loginSlice"; 
import login from "../../assets/LoginLogin.svg";
import {
  containerStyles,
  cardStyles,
  formContainerStyles,
  alertStyles,
} from "./style";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = { email, password };
    try {
      const data = await dispatch(loginUser(credentials)).unwrap();
      const role = data.is_admin ? "admin" : "user"; 
      onLogin(role); 
    } catch (err) {
      setErrorMessages({ ...errorMessages, general: err.message });
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ ...containerStyles }}>
      <Grid item xs={12} md={10} lg={8}>
        <Box sx={{ ...cardStyles }}>
          <Grid item xs={12} md={7}>
            <Box><img src={login} width={"100%"} /></Box>
          </Grid>

          <Grid item xs={12} md={5} sx={{ ...formContainerStyles }}>
            <Box component="form" onSubmit={handleSubmit}>
              <Typography variant="h2" gutterBottom>
                Login
              </Typography>

              {error && (
                <Alert severity="error" sx={{ ...alertStyles }}>
                  {error}
                </Alert>
              )}

              {errorMessages.general && (
                <Alert severity="error" sx={{ marginBottom: 2 }}>
                  {errorMessages.general}
                </Alert>
              )}

              <TextField
                fullWidth
                label="Email Address"
                variant="outlined"
                type="email"
                margin="normal"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errorMessages.email) setErrorMessages({ ...errorMessages, email: undefined });
                }}
              />

              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                type="password"
                margin="normal"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errorMessages.password) setErrorMessages({ ...errorMessages, password: undefined });
                }}
              />

              <Box mt={2}>
                <Button type="submit" fullWidth variant="contained" color="primary" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </Box>

              <Typography mt={2}>
                Not a member? <a href="/register">Register</a>
              </Typography>
            </Box>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;

