import React, { useContext } from 'react';
import { StringContext } from 'strings';
import { KeyboardDateTimePicker } from '@material-ui/pickers';

const isAMPM = () => {
  var date = new Date(Date.UTC(2012, 11, 12, 3, 0, 0));
  var dateString = date.toLocaleTimeString();

  //apparently toLocaleTimeString() has a bug in Chrome. toString() however returns 12/24 hour formats. If one of two contains AM/PM execute 12 hour coding.
  if (dateString.match(/am|pm/i) || date.toString().match(/am|pm/i)) {
    //12 hour clock
    console.log('12 hour');
    return true;
  } else {
    //24 hour clock
    console.log('24 hour');
    return false;
  }
};

export default function FormikDateTimePicker({ field, form, ...other }) {
  // const { datetime, handleDateTimeError } = other;
  const currentError = form.errors[field.name];
  const strings = useContext(StringContext);

  return (
    <KeyboardDateTimePicker
      // disableToolbar
      // format="MM/dd/yyyy"
      format="hh:mm a"
      ampm={isAMPM()}
      name={field.name}
      // views={['date', 'hours', 'minutes']}
      value={field.value}
      helperText={currentError}
      error={Boolean(currentError)}
      KeyboardButtonProps={{
        'aria-label': 'change date'
      }}
      // variant="inline"
      cancelLabel={strings.btn__cancel}
      onChange={date => form.setFieldValue(field.name, date, false)}
      {...other}
    />
  );
}
