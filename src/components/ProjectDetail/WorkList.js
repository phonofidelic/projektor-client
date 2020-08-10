import React, { useState, useContext, useMemo } from 'react';
import { StringContext } from 'strings';
import moment from 'moment';

import MobileWorkMenu from './MobileWorkMenu';

import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Typography from '@material-ui/core/Typography';

import MoreVertIcon from '@material-ui/icons/MoreVert';

export default function WorkList(props) {
  const { work, handleOpenWork, removeWork } = props;
  const [selectedWork, setSelectedWork] = useState(null);
  const [workMenuOpen, setWorkMenuOpen] = useState(false);

  const currentLocaleData = moment.localeData();
  const strings = useContext(StringContext);

  const workData = useMemo(
    () =>
      work.map(workItem => ({
        ...workItem,
        startDate: moment(workItem.start).format(
          currentLocaleData.longDateFormat('L')
        ),
        start: moment(workItem.start).format(
          currentLocaleData.longDateFormat('LT')
        ),
        end: moment(workItem.end).format(currentLocaleData.longDateFormat('LT'))
      })),
    [work, currentLocaleData]
  );

  const handleOpenWorkMenu = workItem => {
    setSelectedWork(workItem);
    setWorkMenuOpen(true);
  };

  const handleCloseWorkMenu = () => {
    setSelectedWork(null);
    setWorkMenuOpen(false);
  };

  return (
    <>
      <MobileWorkMenu
        open={workMenuOpen}
        workItem={selectedWork}
        handleOpenWork={handleOpenWork}
        handleCloseWorkMenu={handleCloseWorkMenu}
        removeWork={removeWork}
      />
      <List>
        {workData.map((workItem, i) => (
          <ListItem key={`work-item_${i}`} divider>
            <ListItemText
              // alignItems="flex-start"
              primary={workItem.startDate}
              secondary={
                <>
                  <Typography variant="body2">
                    {workItem.start} - {workItem.end}
                  </Typography>
                  {workItem.notes && (
                    <Typography variant="body2">
                      {strings.lbl__work_tbl_notes}: {workItem.notes}
                    </Typography>
                  )}
                </>
              }
              secondaryTypographyProps={{ component: 'span' }}
            />
            <ListItemSecondaryAction>
              <IconButton onClick={() => handleOpenWorkMenu(workItem)}>
                <MoreVertIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </>
  );
}
