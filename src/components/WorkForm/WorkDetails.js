import React, { useContext } from 'react';
import { StringContext } from 'strings';
import styled from 'styled-components';
import { Field } from 'formik';
import moment from 'moment';
import useMobileDetect from 'use-mobile-detect-hook';

import FormikDateTimePicker from 'components/FormikDateTimePicker';
import { TaskSuggestions } from 'components/TaskAnalysis';

import { useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const InputContainer = styled.div`
  margin-top: 10px;
`;

const parseDateString = (string) => {
  if (typeof string === 'number') return string;
  return Date.parse(string);
};

export default function WorkDetails(props) {
  const {
    project,
    workItem,
    values,
    touched,
    errors,
    handleChange,
    setFieldValue,
  } = props;

  const strings = useContext(StringContext);
  const currentLocaleData = moment.localeData();
  const { isMobile } = useMobileDetect();
  const theme = useTheme();

  return (
    <Grid
      container
      style={{
        padding: 24,
        // paddingLeft: isMobile() ? 24 - 15 : 24,
        paddingBottom: isMobile()
          ? theme.dimensions.workFormFooter.height + 24
          : 0,
      }}
    >
      <Grid item xs={12} sm={6}>
        <Typography variant="overline">
          {strings.lbl__work_tbl_start_date}:
        </Typography>{' '}
        {moment(values.start).format(currentLocaleData.longDateFormat('L'))}
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
        <Typography variant="overline">{strings.ttl__work_notes}</Typography>
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
          // taskAlloc={values.taskAlloc}
          setFieldValue={setFieldValue}
        />
      </Grid>
    </Grid>
  );
}
