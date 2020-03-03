import React, { useContext } from 'react';
import { StringContext } from 'strings';
import {
  KeyboardDateTimePicker,
  KeyboardTimePicker
} from '@material-ui/pickers';

export default function FormikDateTimePicker({ field, form, ...other }) {
  // const { datetime, handleDateTimeError } = other;
  const currentError = form.errors[field.name];
  const strings = useContext(StringContext);

  return (
    <KeyboardDateTimePicker
      disableToolbar
      // format="MM/dd/yyyy"
      format="hh:mm a"
      // ampm={false}
      name={field.name}
      // views={['date', 'hours', 'minutes']}
      value={field.value}
      helperText={currentError}
      error={Boolean(currentError)}
      KeyboardButtonProps={{
        'aria-label': 'change date'
      }}
      cancelLabel={strings.btn__cancel}
      onChange={date => form.setFieldValue(field.name, date, false)}
      // onError={(error, value) => {
      //   console.log('KeyboardDateTimePicker error:', error);
      //   handleDateTimeError(error, value);
      //   // return error;
      // }}
      {...other}
    />
  );
}
