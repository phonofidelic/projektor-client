import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 3000;
`;

const MessageContainer = styled(Paper)`
  max-width: 500px;
  margin: 80px auto;
  padding: 24px;
`;

const BodyContainer = styled.div`
  margin-top: 24px;
  text-align: left;
  white-space: pre-wrap;
`;

function _Dialog(props) {
  const {
    showDialog,
    title,
    body,
    actionButton,
    errorContext,
    resendVerificationEmail
  } = props;

  const handleClose = () => {
    console.log('close dialog');
  };

  const handleAction = () => {
    resendVerificationEmail();
  };

  return showDialog ? (
    // <Container>
    //   <MessageContainer>
    //     <Typography variant="h4">{title}</Typography>
    //     <BodyContainer>
    //       <Typography>{body}</Typography>
    //     </BodyContainer>
    //   </MessageContainer>
    // </Container>
    <Dialog
      open={showDialog}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
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
        {/* <Button onClick={handleClose} color="primary">
          Cancel
        </Button> */}
        <Button onClick={handleAction} color="primary">
          {actionButton}
        </Button>
      </DialogActions>
    </Dialog>
  ) : null;
}

const mapStateToProps = state => {
  return {
    showDialog: state.message.showDialog,
    title: state.message.title,
    body: state.message.body,
    actionButton: state.message.actionButton,
    errorContext: state.message.errorContext
  };
};

export default connect(mapStateToProps, actions)(_Dialog);
