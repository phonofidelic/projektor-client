import React from 'react';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';

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
      <Table size="small">
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
            <TableRow key={workItem._id} hover>
              <TableCell>
                <Typography>
                  {moment(workItem.date).format('MM/DD/YYYY')}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography>
                  {moment(workItem.start).format('hh:mm')}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography>
                  {workItem.end ? moment(workItem.end).format('hh:mm') : '--'}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography>
                  {moment
                    .duration(workItem.duration, 'ms')
                    .format('hh:mm:ss', { trim: false })}
                </Typography>
              </TableCell>
              <TableCell>{workItem.notes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}