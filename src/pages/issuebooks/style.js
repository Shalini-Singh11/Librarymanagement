export const containerStyles = {
    textAlign: "center",
    color: (theme) => theme.palette.grey[100],
  };
  
  export const tableContainerStyles = {
    backgroundColor: (theme) => theme.palette.primary[400],
    borderRadius: "4px",
    overflow: "hidden",
  };
  
  export const tableHeadCellStyles = {
    backgroundColor: (theme) => theme.palette.blueAccent[700],
    color: (theme) => theme.palette.grey[100],
    fontWeight: "bold",
  };
  
  export const tableRowStyles = (index) => ({
    backgroundColor: index % 2 === 0 ? "#f0f8ff" : "#e0e0e0",
  });
  
  export const tableCellStyles = {
    color: "#001f3f",
  };
  