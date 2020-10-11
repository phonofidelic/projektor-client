import React from 'react';
import useMobileDetect from 'use-mobile-detect-hook';

import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';

export function WorkModal(props) {
  const {
    children,
    open,
    // workItem,
    // activeNote,
    handleClose,
    // handleSetActiveNote,
    // updateWork
  } = props;
  // const strings = useContext(StringContext);
  // const currentLocaleData = moment.localeData();
  const { isMobile } = useMobileDetect();

  return (
    <Modal
      open={Boolean(open)}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <Slide in={open} direction="up">
        <Paper
          style={{
            maxWidth: 800,
            margin: '100px auto',
            // margin: 'auto',
            outline: 0,
            position: isMobile() ? 'absolute' : 'relative',
            bottom: isMobile() ? 0 : 'inherit',
            marginBottom: isMobile() ? 0 : 100,
          }}
        >
          {children}
        </Paper>
      </Slide>
    </Modal>
  );
}

export default WorkModal;
