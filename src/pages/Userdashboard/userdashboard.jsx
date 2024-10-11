import { Box, Button, Typography, Container, Grid } from "@mui/material";
import MainAnimation from "../../components/Mainanimations/mainanimations";
import DashboardIMg from "../../assets/DashImg.svg";
import Navbar from "../../layouts/Navbar/navbar";

import {
  mainBgStyles,
  headingStyles,
  paragraphStyles,
  buttonStyles,
  bannerImageStyles,
  gridContainerStyles,
  UserBorrowlink,
} from "./style";
import { Link } from "react-router-dom";

const userdashboard = () => {
  return (
    <>
    <Navbar/>
    <Box sx={mainBgStyles}>
      <MainAnimation />
      <Container sx={{ position: "absolute" }}>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12} md={5}>
            <Typography variant="h1" sx={headingStyles}>
              We Provide the Best Library Services All over India
            </Typography>
            <Typography variant="body1" sx={paragraphStyles}>
              Explore a world of knowledge with our easy-to-use Library
              Management System. We’ve designed this platform to help you find
              and access the books and resources you need, all from the comfort
              of your device.
            </Typography>
            <Button
              variant="contained"
              component={Link}
              to="/UserBorrowBooks"
              sx={{ ...buttonStyles, textDecoration: "none", color: "white" }}
            >
              Borrow Now
            </Button>
          </Grid>
          <Grid item xs={12} md={7} sx={gridContainerStyles}>
            <Box
              component="img"
              src={DashboardIMg}
              alt="Library management"
              sx={bannerImageStyles}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
    </>
  );
};

export default userdashboard;
