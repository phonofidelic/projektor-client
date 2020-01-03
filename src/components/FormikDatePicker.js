import React, { useContext } from 'react';
import { StringContext } from 'strings';
import { KeyboardDatePicker } from '@material-ui/pickers';

export default function FormikDatePicker({ field, form, ...other }) {
  const currentError = form.errors[field.name];
  const strings = useContext(StringContext);

  return (
    <KeyboardDatePicker
      disableToolbar
      format="MM/dd/yyyy"
      name={field.name}
      value={field.value}
      helperText={currentError}
      error={Boolean(currentError)}
      KeyboardButtonProps={{
        'aria-label': 'change date'
      }}
      cancelLabel={strings.btn__cancel}
      onChange={date => form.setFieldValue(field.name, date, false)}
      {...other}
    />
  );
}
