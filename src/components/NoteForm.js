import React, { useContext } from 'react';
import { StringContext } from 'strings';
import { Formik, Form } from 'formik';
import moment from 'moment';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

export function NoteForm(props) {
  const {
    workItem,
    activeNote,
    handleClose,
    handleSetActiveNote,
    updateWork
  } = props;
  const strings = useContext(StringContext);
  const currentLocaleData = moment.localeData();

  return (
    <Formik
      initialValues={{ note: workItem ? workItem.notes : '' }}
      onSubmit={(values, { setSubmitting }) => {
        handleSetActiveNote(values.note);
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
          <Grid container style={{ padding: 24, paddingBottom: 0 }}>
            <Grid item xs={12}>
              <Typography
                style={{ marginBottom: 24 }}
                id="form-dialog-title"
                variant="h6"
              >
                {strings.ttl__work_details}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={workItem ? 6 : 12}>
              <TextField
                autoFocus
                multiline
                rows={3}
                variant="outlined"
                margin="dense"
                id="note"
                label={strings.ttl__work_notes}
                fullWidth
                name="note"
                value={values.note || activeNote || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  {strings.btn__cancel}
                </Button>
                <Button type="submit" color="primary">
                  {strings.btn__save}
                </Button>
              </DialogActions>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}

export default NoteForm;
