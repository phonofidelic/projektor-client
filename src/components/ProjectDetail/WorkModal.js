import React from 'react';
import useMobileDetect from 'use-mobile-detect-hook';

import { useTheme } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';

export function WorkModal(props) {
  const { children, open, handleClose } = props;
  const { isMobile } = useMobileDetect();
  const theme = useTheme();

  return (
    <Modal
      open={Boolean(open)}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      style={{
        overflowY: isMobile() ? 'unset' : 'auto',
      }}
    >
      <Slide in={open} direction="up">
        <Paper
          style={{
            maxWidth: 800,
            margin: `${theme.dimensions.header.height}px auto`,
            outline: 0,
            position: isMobile() ? 'absolute' : 'relative',
            top: isMobile() ? 0 : 'inherit',
            bottom: isMobile() ? 0 : 'inherit',
            marginBottom: isMobile() ? 0 : 100,
            overflow: 'auto',
          }}
        >
          {children}
        </Paper>
      </Slide>
    </Modal>
  );
}

export default WorkModal;
