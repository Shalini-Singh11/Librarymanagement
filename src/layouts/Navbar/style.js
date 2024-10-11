export const navbarStyles = (scrolled) => ({
    height: "12vh",
    backgroundColor: scrolled ? "white" : "transparent",
    color: scrolled ? "black" : "white",
    boxShadow: scrolled ? "0px 4px 12px rgba(0, 0, 0, 0.1)" : "none",
    transition: "background-color 0.3s ease-in-out",
    zIndex: 999,
    justifyContent: "center",
  });
  
  export const toolbarStyles = {
    display: "flex",
    justifyContent: "space-between",
    padding: "0 67px",
    "@media (max-width: 800px)": {
      padding: "0 5%",
    },
  };
  
  export const logoStyles = {
    width: "19%",
  };
  
  export const menuIconStyles = {
    display: { xs: "block", md: "none" },
  };
  
  export const navLinkStyles = (scrolled) => ({
    fontSize: "25px",
    fontWeight: 600,
    margin: "0 3%",
    color: scrolled ? "black" : "white",
    textDecoration: "none",
    "&:hover": {
      color: scrolled ? "gray" : "lightgray",
    },
  });
  