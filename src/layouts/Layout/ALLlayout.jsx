import { Box } from "@mui/material";
import PropTypes from "prop-types"; 
import Sidebar from "../sidebar/Sidebar";
import Topbar from "../topbar/Topbar";

const Layout = ({ children }) => {
  return (
    <Box display={"flex"}>
    {/* ================ sidebar ================ */}
      <Sidebar />                                   
      <Box flexGrow={1} display={"flex"} flexDirection={"column"}>
      {/* ================ TopBar ================ */}
        <Topbar />
        <main className="content">
        {/* ================ Dashboard Cards and all ================  */}
          <Box m="20px">
            {children}
          </Box>
        </main>
      </Box>
    </Box>
  );
};


Layout.propTypes = {
  children: PropTypes.node.isRequired, 
};

export default Layout;
