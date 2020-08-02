import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function _Dialog(props) {
  const { showDialog, title, body, actionButton, action } = props;

  const handleClose = () => {
    console.log('close dialog');
  };

  const handleAction = () => {
    action();
  };

  return showDialog ? (
    <Dialog
      open={showDialog}
      onClose={handleClose}
      aria-labelledby={title}
      aria-describedby={body}
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          style={{ whiteSpace: 'pre-wrap' }}
        >
          {body}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {actionButton && (
          <Button onClick={handleAction} color="primary">
            {actionButton}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  ) : null;
}
