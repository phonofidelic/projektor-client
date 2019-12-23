import React, { useContext } from 'react';
import moment from 'moment';
import { StringContext } from 'strings';

import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

moment.locale(navigator.language);
var currentLocaleData = moment.localeData(moment.locale());
var svLocaleData = moment.localeData('sv');
console.log('====================================');
console.log('currentLocaleData:', currentLocaleData);
console.log('====================================');

export default function WorkTable(props) {
  const { project } = props;
  const strings = useContext(StringContext);
  // console.log('====================================');
  // console.log(project);
  // console.log('====================================');
  return (
    <Paper style={{ margin: 18 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>{strings.lbl__work_tbl_start_date}</TableCell>
            <TableCell>{strings.lbl__work_tbl_start_time}</TableCell>
            <TableCell>{strings.lbl__work_tbl_end_time}</TableCell>
            <TableCell>{strings.lbl__work_tble_duration}</TableCell>
            <TableCell>{strings.lbl__work_tble_notes}</TableCell>
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
                  {moment(workItem.start).format('hh:mm a')}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography>
                  {workItem.end ? moment(workItem.end).format('hh:mm a') : '--'}
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
