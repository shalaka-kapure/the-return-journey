import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const Item = ({ item }) => {
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {item.name}
      </TableCell>
      <TableCell align="right">{item.email}</TableCell>
      <TableCell align="right">{item.username}</TableCell>
      <TableCell align="right">{item.phone}</TableCell>
      <TableCell align="right">{item.company.name}</TableCell>
    </TableRow>
  );
};

export default React.memo(Item);
