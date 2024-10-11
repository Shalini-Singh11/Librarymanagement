import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme/theme";
import logo from "../../../public/HomeLogo.png";

// MUI Components==================

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import PersonSearchOutlinedIcon from "@mui/icons-material/PersonSearchOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import AssignmentReturnOutlinedIcon from "@mui/icons-material/AssignmentReturnOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
// import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";

const menuData = [
  { title: "Dashboard", to: "/Dashboard", icon: <HomeOutlinedIcon /> },
  {
    title: "Manage Books",
    to: "/BooksManager",
    icon: <MenuBookOutlinedIcon />,
  },
  { title: "Manage Users", to: "/UserManager", icon: <GroupOutlinedIcon /> },
  {
    title: "Author Manage",
    to: "/AuthorManage",
    icon: <PersonSearchOutlinedIcon />,
  },
  {
    title: "Total Books",
    to: "/TotalBooks",
    icon: <LibraryBooksOutlinedIcon />,
  },
  {
    title: "Issue Books",
    to: "/IssueBooks",
    icon: <AssignmentReturnOutlinedIcon />,
  },
  { title: "Profile", to: "/Profile", icon: <AccountCircleOutlinedIcon /> },
  // {
  //   title: "Update Profile",
  //   to: "/UpdateProfile",
  //   icon: <ManageAccountsOutlinedIcon />,
  // },
];

// eslint-disable-next-line react/prop-types
const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100] }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#EF4193 !important",
        },
        "& .pro-menu-item.active": {
          color: "#EF4193 !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/*======================= LOGO AND MENU ICON ====================*/}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{ margin: "10px 0 20px 0", color: colors.grey[100] }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              ml="15px"
            >
              {!isCollapsed && (
                <Typography variant="h3" color={colors.grey[100]}>
                  DASHBOARD
                </Typography>
              )}
              <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                <MenuOutlinedIcon />
              </IconButton>
            </Box>
          </MenuItem>

          {!isCollapsed && (
            <Box
              mb="25px"
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Box
                alt="profile-user"
                component="img"
                width="100px"
                height="100px"
                src={logo}
                style={{ cursor: "pointer", borderRadius: "50%" }}
              />
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Admin
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            {menuData.map((menuItem) => (
              <Item
                key={menuItem.title}
                {...menuItem}
                selected={selected}
                setSelected={setSelected}
              />
            ))}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
