import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Button,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import logoWhite from "../../../public/HomeLogo.png";
import logoColor from "../../../public/HomeLogo.png";
import {
  navbarStyles,
  logoStyles,
  navLinkStyles,
  menuIconStyles,
  toolbarStyles,
} from "./style";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // const handleLogout = () => {
  //   localStorage.removeItem('Token');
  //   localStorage.removeItem('IsAdmin');
  //   navigate("/");
  // };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <IconButton
        edge="start"
        color="inherit"
        sx={{ justifyContent: "flex-end" }}
      >
        <CloseIcon />
      </IconButton>
      <List>
        <ListItem component="a" href="/UserDashboard">
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem component="a" href="/UserTotalBooks">
          <ListItemText primary="Total Books" />
        </ListItem>
        <ListItem component="a" href="/UserBorrowBooks">
          <ListItemText primary="Borrow Books" />
        </ListItem>
        <ListItem component="a" href="/Userprofile">
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem component="a" href="/">
          <ListItemText primary="Sign Out" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="fixed" sx={navbarStyles(scrolled)}>
        <Container sx={{padding: "0 !important"}}>
          <Toolbar sx={toolbarStyles}>
            <Box sx={{ flexGrow: 1 }}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={menuIconStyles}
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
              <img
                src={scrolled ? logoColor : logoWhite}
                alt="logo"
                style={logoStyles}
              />
            </Box>

            <Box sx={{ display: { xs: "none", md: "flex" }, width: "100%" }}>
              <Button sx={navLinkStyles(scrolled)} href="/UserDashboard">
                <Typography
                  sx={{ textTransform: "capitalize", fontSize: "18px" }}
                >
                  Home
                </Typography>
              </Button>
              <Button sx={navLinkStyles(scrolled)} href="/UserTotalBooks">
                <Typography
                  sx={{ textTransform: "capitalize", fontSize: "18px" }}
                >
                  Total Books
                </Typography>
              </Button>
              <Button sx={navLinkStyles(scrolled)} href="/UserBorrowBooks">
                <Typography
                  sx={{ textTransform: "capitalize", fontSize: "18px" }}
                >
                  Borrow Books
                </Typography>
              </Button>
              <Button sx={navLinkStyles(scrolled)} href="/Userprofile">
                <Typography
                  sx={{ textTransform: "capitalize", fontSize: "18px" }}
                >
                  Profile
                </Typography>
              </Button>
              <Button sx={navLinkStyles(scrolled)} href="/">
                <Typography
                  sx={{ textTransform: "capitalize", fontSize: "18px" }}
                >
                  Sign Out
                </Typography>
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
