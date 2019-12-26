import React, { useContext } from 'react';
import { StringContext } from 'strings';
import { Formik, Form, Field } from 'formik';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';

export function NoteDialog(props) {
  const {
    open,
    workItem,
    handleClose,
    handleSetActiveNote,
    updateWork
  } = props;
  const strings = useContext(StringContext);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <Formik
        initialValues={{ note: workItem ? workItem.notes : '' }}
        onSubmit={(values, { setSubmitting }) => {
          console.log('Posting note:', values.note);
          console.log('Posting workItem:', workItem);
          workItem
            ? updateWork({ ...workItem, notes: values.note })
            : handleSetActiveNote(values.note);
          handleClose();
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (
          <Form>
            <DialogTitle id="form-dialog-title">
              {strings.ttl__work_notes}
            </DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                multiline
                fullWidth
                rows={3}
                variant="outlined"
                margin="dense"
                id="note"
                label={strings.ttl__work_notes}
                fullWidth
                name="note"
                value={values.note}
                onChange={handleChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                {strings.btn__cancel}
              </Button>
              <Button type="submit" color="primary">
                {strings.btn__save}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}

export default NoteDialog;
