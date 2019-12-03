import React from 'react';
import moment from 'moment';

import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default function WorkTable(props) {
  const { project } = props;
  // console.log('====================================');
  // console.log(project);
  // console.log('====================================');
  return (
    <Paper style={{ margin: 18 }}>
      <div style={{ margin: 10 }}>
        <Typography variant="h5" align="left">
          Work
        </Typography>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Start</TableCell>
            <TableCell>Stop</TableCell>
            <TableCell>Duration</TableCell>
            <TableCell>Notes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {project.work.map(workItem => (
            <TableRow key={workItem.id}>
              <TableCell>
                {moment(workItem.date).format('ddd, MMMM Do YYYY, hh:mm:ss')}
              </TableCell>
              <TableCell>{moment(workItem.start).format('hh:mm:ss')}</TableCell>
              <TableCell>{moment(workItem.stop).format('hh:mm:ss')}</TableCell>
              <TableCell>{workItem.duration}</TableCell>
              <TableCell>{workItem.notes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
