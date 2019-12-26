import React, { useContext } from 'react';
import { StringContext } from 'strings';
import moment from 'moment';

import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PostAddIcon from '@material-ui/icons/PostAdd';

export default function WorkTable(props) {
  const { project, hadleOpenNote } = props;
  const strings = useContext(StringContext);
  const currentLocaleData = moment.localeData();

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
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {project.work.map(workItem => (
            <TableRow key={workItem._id} hover>
              <TableCell>
                <Typography>
                  {moment(workItem.date).format(
                    currentLocaleData.longDateFormat('L')
                  )}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography>
                  {moment(workItem.start).format(
                    currentLocaleData.longDateFormat('LT')
                  )}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography>
                  {workItem.end
                    ? moment(workItem.end).format(
                        currentLocaleData.longDateFormat('LT')
                      )
                    : '--'}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography>
                  {moment
                    .duration(workItem.duration, 'ms')
                    .format('hh:mm:ss', { trim: false })}
                </Typography>
              </TableCell>
              <TableCell>
                {workItem.notes ? (
                  <Typography noWrap style={{ maxWidth: 150 }}>
                    {workItem.notes}
                  </Typography>
                ) : (
                  <Typography variant="caption" style={{ margin: 10 }}>
                    {strings.msg__default_empty_notes}
                  </Typography>
                )}
              </TableCell>
              <TableCell>
                <Tooltip
                  title={strings.hnt__add_note}
                  placement="top-start"
                  enterDelay={400}
                >
                  <IconButton
                    size="small"
                    onClick={() => hadleOpenNote(workItem)}
                  >
                    <PostAddIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
