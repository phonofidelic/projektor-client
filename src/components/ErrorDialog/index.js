import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useAuth } from 'services/AuthProvider';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export function ErrorDialog(props) {
  const { showDialog, title, body, actionButton, action } = props;
  const [open, setOpen] = useState(Boolean(showDialog));

  const { getAccessTokenSilently } = useAuth();

  const handleClose = () => {
    console.log('close dialog');
    setOpen(false);
  };

  const handleAction = async () => {
    const token = await getAccessTokenSilently();
    action(token);
  };

  useEffect(() => {
    setOpen(Boolean(showDialog));
  }, [showDialog]);

  return (
    <Dialog
      open={open}
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
        <Button onClick={handleClose}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}

ErrorDialog.propTypes = {
  showDialog: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string,
  actionButton: PropTypes.string,
  action: PropTypes.func,
};

export default ErrorDialog;
