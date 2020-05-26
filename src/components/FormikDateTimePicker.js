import React, { useContext } from 'react';
import { StringContext } from 'strings';
import { KeyboardDateTimePicker } from '@material-ui/pickers';
import { isAMPM } from 'utils';

// /**
//  * https://stackoverflow.com/a/27648032
//  */
// const isAMPM = () => {
//   var date = new Date(Date.UTC(2012, 11, 12, 3, 0, 0));
//   var dateString = date.toLocaleTimeString();
//   console.log('====================================');
//   console.log('date.toLocaleTimeString():', date.toLocaleTimeString());
//   console.log('date.toString():', date.toString());
//   console.log('====================================');

//   if (dateString.match(/am|pm/i)) {
//     console.log('12 hour');
//     return true;
//   } else {
//     console.log('24 hour');
//     return false;
//   }
// };

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
        'aria-label': 'change date',
      }}
      // variant="inline"
      cancelLabel={strings.btn__cancel}
      onChange={(date) => {
        console.log('FormikDateTimePicker, onChange date:', date);
        form.setFieldValue(field.name, date, false);
      }}
      {...other}
    />
  );
}
