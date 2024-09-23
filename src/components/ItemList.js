import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectAllItems,
  selectItemStatus,
  selectItemError,
  selectSearchTerm,
} from "../store/itemSlice";
import TablePaginationActions from "./Pagination";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Item from "./Item";

const ItemList = () => {
  const items = useSelector(selectAllItems);
  const status = useSelector(selectItemStatus);
  const error = useSelector(selectItemError);
  const searchTerm = useSelector(selectSearchTerm);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredItems = useMemo(() => {
    if (!items) return []; 
    const searchTermLower = searchTerm ? searchTerm.toLowerCase() : ""; 
    return items.filter((item) => {
      return (
        (item.name && item.name.toLowerCase().includes(searchTermLower)) ||
        (item.email && item.email.toLowerCase().includes(searchTermLower)) ||
        (item.username &&
          item.username.toLowerCase().includes(searchTermLower)) ||
        (item.company.name && item.company.name.toLowerCase().includes(searchTermLower))
      );
    });
  }, [items, searchTerm]);

  const displayedItems = useMemo(() => {
    return filteredItems.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [filteredItems, page, rowsPerPage]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  if (status === 'succeeded' && items.length === 0) {
    return <div>No items found</div>;
}

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Username</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">Company</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {displayedItems.map((item) => (
            <Item key={item.id} item={item} />
          ))}
        </TableBody>
        <TablePaginationActions
          count={filteredItems.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }}
          rowsPerPageOptions={[5, 10]}
        />
      </Table>
    </TableContainer>
  );
};

export default ItemList;
