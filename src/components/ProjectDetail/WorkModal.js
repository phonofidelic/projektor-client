import React from 'react';

import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';

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

  return (
    <Modal
      open={Boolean(open)}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <Paper
        style={{
          maxWidth: 800,
          margin: '100px auto',
          outline: 0,
        }}
      >
        {children}
      </Paper>
    </Modal>
  );
}

export default WorkModal;
