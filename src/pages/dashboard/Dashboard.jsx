import { Box, Grid } from "@mui/material";
// import { tokens } from "../../theme/theme";
import Header from "../../layouts/header/Header";
import Card from "../../components/Cards/Card";
// import Userlist from "../../components/List/Userlist";
// import Booklist from "../../components/List/Booklist";
import Topchoice from "../../components/TopChoice/Topchoice";


const Dashboard = () => {
  // const theme = useTheme();
  // const colors = tokens(theme.palette.mode);
  

  return (
    <Box>
      {/*================== HEADER ======================*/}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Library Management System" />
      </Box>
      {/*================== CARD ======================*/}
      <Card />
      <Grid container spacing={4} mt={4}>
        {/* <Userlist /> */}
        {/* <Booklist /> */}
      </Grid>
      {/*================== TOPchoice ======================*/}
      <Box>
        <Topchoice />
      </Box>
    </Box>
  );
};

export default Dashboard;
