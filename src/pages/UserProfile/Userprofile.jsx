import { useState, useEffect } from "react";
import {
  Box,
  // Button,
  Typography,
  Avatar,
  Card,
  CardContent,
  Table,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Container,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import profile from "../../assets/ProfileuserForm.svg";
import EditIcon from "@mui/icons-material/Edit";
import { useTheme } from "@mui/material/styles";
// import Header from "../../layouts/header/Header";
import apiService from "../../services/ApiServices";
import MainAnimation from "../../components/Mainanimations/mainanimations";
import DashboardIMg from "../../assets/UserProfile.svg";
import Navbar from "../../layouts/Navbar/navbar";

// styles =======================================
import {
  containerStyles,
  gridContainerStyles,
  avatarStyles,
  cardStyles,
  tableCellLabelStyles,
  tableCellValueStyles,
  // buttonStyles,
  mainBgStyles,
  headingStyles,
  paragraphStyles,
  bannerImageStyles,
  gridContainerimg,
} from "./style";

const Userprofile = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await apiService.get(`api/auth/user/${localStorage.getItem("userid")}`);
        const data = await response.json();
        setUserProfile(data);
      } catch (error) {
        // console.error("Error fetching profile data:", error);
        setError(error.message); 
      }
    };

    fetchProfileData();
  }, []);

  if (!userProfile) {
    return <Typography>Loading...</Typography>;
  }

  const profileDetails = [
    { label: "First Name", value: userProfile.first_name },
    { label: "Last Name", value: userProfile.last_name },
    { label: "Email", value: userProfile.email },
    { label: "Phone", value: userProfile.phone },
  ];

  return (
    <>
      <Navbar />
      <Box sx={mainBgStyles}>
        <MainAnimation />
        <Container sx={{ position: "absolute" }}>
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12} md={5}>
              <Typography variant="h1" sx={headingStyles}>
                Profile
              </Typography>
              <Typography variant="body1" sx={paragraphStyles}>
                Manage your personal information effortlessly with our Profile
                section. Keep your details up to date, track your borrowing
                history, and customize your preferences, all in one convenient
                and secure place."
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} sx={gridContainerimg}>
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
      <Box sx={containerStyles}>
        {/* <Header title="Profile" subtitle="Profile Information" /> */}
        <Grid container sx={gridContainerStyles}>
          <Grid item xs={12} sm={6} display="flex" justifyContent="center">
            <Avatar alt="User Image" src={profile} sx={avatarStyles} />
          </Grid>

          <Grid item xs={12} sm={5}>
            <Card elevation={0} sx={cardStyles(theme)}>
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  {/* <IconButton onClick={() => navigate("/UpdateProfile")}>
                    <EditIcon />
                  </IconButton> */}
                </Box>
                <Table>
                  <TableBody>
                    {profileDetails.map((detail, index) => (
                      <TableRow key={index}>
                        <TableCell sx={tableCellLabelStyles}>
                          <Typography variant="body1">
                            {detail.label}
                          </Typography>
                        </TableCell>
                        <TableCell>:</TableCell>
                        <TableCell sx={tableCellValueStyles}>
                          <Typography variant="body1">
                            {detail.value}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* <Button
              variant="contained"
              color="primary"
              sx={buttonStyles}
              onClick={() => navigate("/UpdateProfile")}
            >
              Update Profile
            </Button> */}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Userprofile;
