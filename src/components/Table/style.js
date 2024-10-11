export const tableContainerStyles = (colors) => ({
    backgroundColor: colors.primary[400],
    borderRadius: '5px',
    overflow: 'hidden',
  });
  
  export const headerCellStyles = (colors) => ({
    backgroundColor: "#d1398159",
    color: colors.grey[100],
    fontWeight: 'bold',
  });
  
  export const tableRowStyles = (index) => ({
    backgroundColor: index % 2 === 0 ? '#fff' : '#F2F0F0',
  });
  
  export const tableCellStyles = {
    color: '#001f3f',
  };
  
  export const loadingTextStyles = (colors) => ({
    textAlign: 'center',
    color: colors.grey[100],
  });
  