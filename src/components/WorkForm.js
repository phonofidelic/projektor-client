import React, { useContext } from 'react';
import { StringContext } from 'strings';
import { Formik, Form, Field } from 'formik';
import moment from 'moment';
import styled from 'styled-components';

import FormikDateTimePicker from 'components/FormikDateTimePicker';

import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

moment.locale(navigator.language);

const parseDateString = (string) => {
  if (typeof string === 'number') return string;
  return Date.parse(string);
};

const WorkInfoContainer = styled(Grid)`
  @media (min-width: 600px) {
    padding-left: 24px;
  }
`;

export function WorkForm(props) {
  const { project, workItem, handleClose, createWork, updateWork } = props;
  const strings = useContext(StringContext);
  const currentLocaleData = moment.localeData();

  return (
    <Formik
      initialValues={{
        projectId: project._id,
        project: project._id,
        date: workItem ? workItem.date : Date.now(),
        start: workItem ? workItem.start : Date.now(),
        end: workItem ? workItem.end : Date.now(),
        duration: workItem ? workItem.duration : 0,
        notes: workItem ? workItem.notes : '',
      }}
      validate={(values) => {
        const errors = {};
        if (parseDateString(values.end) <= parseDateString(values.start)) {
          errors.end = 'Stop must be after Start';
        }

        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        console.log('Posting note:', values.note);
        console.log('Posting workItem:', workItem);
        workItem
          ? updateWork({
              ...values,
              _id: workItem._id,
              duration:
                parseDateString(values.end) - parseDateString(values.start),
            })
          : createWork({
              ...values,
              duration:
                parseDateString(values.end) - parseDateString(values.start),
            });
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
        isSubmitting,
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
                name="notes"
                value={values.notes || ''}
                onChange={handleChange}
              />
            </Grid>
            <WorkInfoContainer item xs={12} sm={6}>
              <div>
                <Typography variant="overline">
                  {strings.lbl__work_tbl_start_date}:
                </Typography>{' '}
                {moment(values.start).format(
                  currentLocaleData.longDateFormat('L')
                )}
              </div>
              {/* <div>
                <Field
                  id="start-date"
                  name="start"
                  label={strings.lbl__work_tbl_start_date}
                  component={FormikDatePicker}
                />
              </div> */}
              <div>
                {/* <Typography variant="overline">
                  {strings.lbl__work_tbl_start_time}:
                </Typography>{' '}
                {moment(workItem.start).format(
                  currentLocaleData.longDateFormat('LT')
                )} */}
                <Field
                  id="start-date"
                  name="start"
                  label={strings.lbl__work_tbl_start_time}
                  component={FormikDateTimePicker}
                  // handleDateTimeError={handleDateTimeError}
                  // onChange={handleChange}
                />
              </div>
              <div>
                {/* <Typography variant="overline">
                  {strings.lbl__work_tbl_end_time}:
                </Typography>{' '}
                {moment(workItem.stop).format(
                  currentLocaleData.longDateFormat('LT')
                )} */}
                <Field
                  id="end-date"
                  name="end"
                  label={strings.lbl__work_tbl_end_time}
                  helperText={touched.end && errors.end}
                  error={Boolean(errors.end && touched.end)}
                  component={FormikDateTimePicker}
                  // handleDateTimeError={handleDateTimeError}
                  // onChange={handleChange}
                />
              </div>
              <div>
                <Typography variant="overline">
                  {strings.lbl__work_tbl_duration}:
                </Typography>{' '}
                {moment
                  .duration(
                    parseDateString(values.end) - parseDateString(values.start),
                    'ms'
                  )
                  .format('hh:mm:ss', { trim: false })}
              </div>
            </WorkInfoContainer>
            <Grid item xs={12}>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  {strings.btn__cancel}
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  // disabled={Object.keys(errors).length > 0}
                >
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

export default WorkForm;
