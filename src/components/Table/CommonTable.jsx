import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme,
} from '@mui/material';
import { tokens } from '../../theme/theme';

// styles =======================================
import {
  tableContainerStyles,
  headerCellStyles,
  tableRowStyles,
  tableCellStyles,
  loadingTextStyles,
} from './style'; 

const CommonTable = ({ headers, data, loading }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  if (loading) {
    return <div style={loadingTextStyles(colors)}>Loading...</div>;
  }

  return (
    <TableContainer component={Paper} sx={tableContainerStyles(colors)}>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell key={header} sx={headerCellStyles(colors)}>
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={row.id} sx={tableRowStyles(index)}>
              {Object.values(row).map((cell, cellIndex) => (
                <TableCell key={cellIndex} sx={tableCellStyles}>
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};


CommonTable.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default CommonTable;
