import React, { useContext } from 'react';
import { StringContext } from 'strings';
import { Formik, Form } from 'formik';
import moment from 'moment';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const WorkInfoContainer = styled(Grid)`
  @media (min-width: 600px) {
    padding-left: 24px;
  }
`;

export function WorkModal(props) {
  const {
    open,
    workItem,
    handleClose,
    handleSetActiveNote,
    updateWork
  } = props;
  const strings = useContext(StringContext);
  const currentLocaleData = moment.localeData();

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <Paper style={{ maxWidth: 500, margin: '100px auto' }}>
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
                    value={values.note}
                    onChange={handleChange}
                  />
                </Grid>
                {workItem && (
                  <WorkInfoContainer item xs={12} sm={6}>
                    <div>
                      <Typography variant="overline">
                        {strings.lbl__work_tbl_start_time}:
                      </Typography>{' '}
                      {moment(workItem.start).format(
                        currentLocaleData.longDateFormat('LT')
                      )}
                    </div>
                    <div>
                      <Typography variant="overline">
                        {strings.lbl__work_tbl_end_time}:
                      </Typography>{' '}
                      {moment(workItem.stop).format(
                        currentLocaleData.longDateFormat('LT')
                      )}
                    </div>
                    <div>
                      <Typography variant="overline">
                        {strings.lbl__work_tble_duration}:
                      </Typography>{' '}
                      {moment
                        .duration(workItem.duration, 'ms')
                        .format('hh:mm:ss', { trim: false })}
                    </div>
                  </WorkInfoContainer>
                )}
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
      </Paper>
    </Modal>
  );
}

export default WorkModal;
