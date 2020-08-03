import React from 'react';
import { useHistory } from 'react-router-dom';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';

export default function ProjectTableRow(props) {
  const { row, hovered, handleRowHover } = props;
  const history = useHistory();

  return (
    <TableRow
      {...row.getRowProps()}
      style={{
        cursor: 'pointer',
        background: `linear-gradient(to right, rgba(0, 0, 0, ${
          hovered === row.original._id ? 0.04 : 0.0
        }) 99.5%, ${row.original.color || '#fff'} 10%)`
      }}
      key={row.original._id}
      onClick={() => history.push('projects/' + row.original._id)}
      // onContextMenu={(e) => handleOpenContextMenu(e, row.original)}
      onMouseEnter={() => handleRowHover(row.original._id)}
      onMouseLeave={() => handleRowHover(null)}
    >
      {row.cells.map(cell => (
        <TableCell
          style={{
            maxWidth: 200,
            minWidth: 100
          }}
          {...cell.getCellProps()}
        >
          <Typography noWrap>{cell.render('Cell')}</Typography>
        </TableCell>
      ))}
    </TableRow>
  );
}
