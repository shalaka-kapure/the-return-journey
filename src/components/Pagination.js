import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";

function TablePaginationActions(props) {
  const theme = useTheme();
  const {
    count,
    page,
    rowsPerPage,
    onPageChange,
    onRowsPerPageChange,
    rowsPerPageOptions = [5, 10],
  } = props;

  const handleFirstPageButtonClick = React.useCallback(
    (event) => {
      onPageChange(event, 0);
    },
    [onPageChange]
  );

  const handleBackButtonClick = React.useCallback(
    (event) => {
      onPageChange(event, page - 1);
    },
    [onPageChange, page]
  );

  const handleNextButtonClick = React.useCallback(
    (event) => {
      onPageChange(event, page + 1);
    },
    [onPageChange, page]
  );

  const handleLastPageButtonClick = React.useCallback(
    (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    },
    [onPageChange, count, rowsPerPage]
  );

  const handleRowsPerPageChange = (event) => {
    onRowsPerPageChange(event, parseInt(event.target.value, 10));
  };

  return (
    <Box
      sx={{
        flexShrink: 0,
        ml: 2.5,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        width: "100%",
        flexGrow: 1, 
      }}
    >
      <FormControl variant="outlined" size="small" sx={{ minWidth: 80, mr: 2 }}>
        <Select value={rowsPerPage} onChange={handleRowsPerPageChange}>
          {rowsPerPageOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  onRowsPerPageChange: PropTypes.func.isRequired,
  rowsPerPageOptions: PropTypes.array,
};

export default TablePaginationActions;
