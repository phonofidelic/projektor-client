import React, { useContext } from 'react';
import { StringContext } from 'strings';
import { Formik, Form, Field } from 'formik';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import useMobileDetect from 'use-mobile-detect-hook';

import styled from 'styled-components';

import FormikDateTimePicker from 'components/FormikDateTimePicker';
import { TaskSuggestions } from 'components/TaskAnalysis';

import { useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

moment.locale(navigator.language);
momentDurationFormatSetup(moment);

const parseDateString = (string) => {
  if (typeof string === 'number') return string;
  return Date.parse(string);
};

const InputContainer = styled.div`
  margin-top: 10px;
`;

export function WorkForm(props) {
  const { project, workItem, handleClose, createWork, updateWork } = props;
  const strings = useContext(StringContext);
  const currentLocaleData = moment.localeData();
  const { isMobile } = useMobileDetect();
  const theme = useTheme();

  console.log('WorkForm, workItem:', workItem);

  return (
    <Formik
      initialValues={{
        projectId: project._id,
        project: project._id,
        date: workItem ? workItem.date : Date.now(),
        start: workItem ? workItem.start : Date.now(),
        end: workItem ? workItem.end : Date.now() + 3.6e6,
        duration: workItem ? workItem.duration : 0,
        notes: workItem ? workItem.notes : '',
        tasks: workItem?.tasks,
      }}
      validate={(values) => {
        const errors = {};
        if (parseDateString(values.end) <= parseDateString(values.start)) {
          errors.end = 'Stop must be after Start';
        }

        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
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
        setFieldValue,
      }) => (
        <Form>
          <div
            style={{
              position: 'sticky',
              top: 0,
              zIndex: theme.zIndex.appBar,
            }}
          >
            <div
              style={{
                padding: 24,

                // width: '100%',
                backgroundColor: theme.palette.background.default,
              }}
            >
              <Typography
                // style={{ marginBottom: 24 }}
                id="form-dialog-title"
                variant="h6"
              >
                {strings.ttl__work_details}
              </Typography>
              {process.env.NODE_ENV !== 'production' && (
                <Typography variant="caption">ID: {workItem?._id}</Typography>
              )}
            </div>
            {isMobile() && <Divider />}
          </div>
          <Grid
            container
            style={{
              padding: 24,
              // paddingLeft: isMobile() ? 24 - 15 : 24,
              paddingBottom: 0,
            }}
          >
            <Grid item xs={12} sm={6}>
              <Typography variant="overline">
                {strings.lbl__work_tbl_start_date}:
              </Typography>{' '}
              {moment(values.start).format(
                currentLocaleData.longDateFormat('L')
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="overline">
                {strings.lbl__work_tbl_duration}:
              </Typography>{' '}
              {moment
                .duration(
                  parseDateString(values.end) - parseDateString(values.start),
                  'ms'
                )
                .format('hh:mm:ss', { trim: false })}
            </Grid>

            <Grid item xs={12} sm={6} style={{ marginTop: 16 }}>
              <InputContainer>
                <Field
                  id="start-date"
                  name="start"
                  label={strings.lbl__work_tbl_start_time}
                  component={FormikDateTimePicker}
                  // handleDateTimeError={handleDateTimeError}
                  // onChange={handleChange}
                />
              </InputContainer>
            </Grid>
            <Grid item xs={12} sm={6} style={{ marginTop: 16 }}>
              <InputContainer>
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
              </InputContainer>
            </Grid>

            <Grid
              item
              xs={12}
              // sm={workItem ? 6 : 12}
              sm={12}
              style={{ marginTop: 16 }}
            >
              <Typography variant="overline">
                {strings.ttl__work_notes}
              </Typography>
              <TextField
                autoFocus={!isMobile()}
                multiline
                // rows={7}
                variant="outlined"
                margin="dense"
                id="note"
                label={strings.msg__task_note_prompt}
                fullWidth
                name="notes"
                value={values.notes || ''}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} style={{ marginTop: 16 }}>
              <TaskSuggestions
                workItem={workItem}
                projectId={project._id}
                notes={values.notes}
                setFieldValue={setFieldValue}
              />
            </Grid>
          </Grid>
          <div
            style={{
              marginTop: 16,
              position: 'sticky',
              bottom: 0,
              backgroundColor: theme.palette.background.default,
              zIndex: theme.zIndex.appBar,
              // paddingRight: 16,
            }}
          >
            {isMobile() && <Divider />}
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
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default WorkForm;
