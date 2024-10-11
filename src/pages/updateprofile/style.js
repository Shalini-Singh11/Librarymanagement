export const formBoxStyles = (theme) => ({
    maxWidth: 800,
    mt: 5,
    p: 3,
    backgroundColor: theme.palette.mode === "dark" ? "#1F2A40" : "#f0f0f0",
    borderRadius: "8px",
    color: theme.palette.mode === "dark" ? "white" : "black",
  });
  
  export const textFieldStyles = (theme) => ({
    "& label": {
      color: theme.palette.mode === "dark" ? "white" : "black",
    },
    "& label.Mui-focused": {
      color: theme.palette.mode === "dark" ? "white" : "black",
    },
    "& .MuiOutlinedInput-root": {
      backgroundColor: theme.palette.mode === "dark" ? "#2E3B55" : "white",
    },
  });
  
  export const buttonStyles = {
    mt: 2,
  };
  
  export const errorBoxStyles = {
    color: "red",
    mt: 2,
  };
  