import { Box, IconButton, useTheme } from "@mui/material";
// import { useContext } from "react";
import { tokens } from "../../theme/theme";
import InputBase from "@mui/material/InputBase";
// import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
// import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined"; 
import { useNavigate } from "react-router-dom"; 

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate(); 

  // const handleLogout = () => {
  //   navigate("/");
  // };

  const handleProfile = () => {
    navigate("/profile");
  }


  const handleLogout = () => {
    localStorage.removeItem('Token');
    localStorage.removeItem('IsAdmin');
    // setIsAuthenticated(false);
    // setIsAdmin(null);
    navigate("/");
  };
  
  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* ================ SEARCH BAR ========================*/}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/*=========== ICONS =================*/}
      <Box display="flex">
        <IconButton onClick={handleProfile}>
          <PersonOutlinedIcon />
        </IconButton>
        <IconButton onClick={handleLogout}>
          <LogoutOutlinedIcon /> 
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
