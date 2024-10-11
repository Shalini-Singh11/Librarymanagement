export const mainBgStyles = {
    backgroundImage: `linear-gradient(to bottom right, #2b4284, #d13981)`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    height: "95vh",
    display: "flex",
    overflow: "hidden",
    position: "relative",
    alignItems: "center",
    borderBottomRightRadius: "200px",
    flexDirection: "column",
    justifyContent: "center",
    "@media (max-width: 800px)" : {
      overflow: "overlay",
    }
  };
  
  export const headingStyles = {
    fontSize: { xs: "35px", sm: "55px" },
    fontWeight: 800,
    color: "white",
    marginBottom: 3,
  };
  
  export const paragraphStyles = {
    fontSize: "16px",
    color: "white",
    marginBottom: 3,
  };
  
  export const buttonStyles = {
    backgroundColor: "#d13981",
    borderColor: "#d13981",
    "&:hover": {
      backgroundColor: "#d13981",
      borderColor: "#d13981",
    },
  };
  
  export const bannerImageStyles = {
    width: "85%",
    zIndex: 99,
  };
  
  export const gridContainerStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  
  export const UserBorrowlink = {
   color: "white",
  };