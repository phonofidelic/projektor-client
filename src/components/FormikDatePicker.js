import React from 'react';
import { KeyboardDatePicker } from '@material-ui/pickers';

export default function FormikDatePicker({ field, form, ...other }) {
  const currentError = form.errors[field.name];

  return (
    <KeyboardDatePicker
      // disableToolbar
      format="MM/dd/yyyy"
      name={field.name}
      value={field.value}
      helperText={currentError}
      error={Boolean(currentError)}
      KeyboardButtonProps={{
        'aria-label': 'change date'
      }}
      onChange={date => form.setFieldValue(field.name, date, false)}
      {...other}
    />
  );
}
