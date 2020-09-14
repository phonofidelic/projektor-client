/**
 * https://stackoverflow.com/a/27648032
 */
export const isAMPM = () => {
  var date = new Date(Date.UTC(2012, 11, 12, 3, 0, 0));
  var dateString = date.toLocaleTimeString();
  // console.log('====================================');
  // console.log('date.toLocaleTimeString():', date.toLocaleTimeString());
  // console.log('date.toString():', date.toString());
  // console.log('====================================');

  if (dateString.match(/am|pm/i)) {
    // console.log('12 hour');
    return true;
  } else {
    // console.log('24 hour');
    return false;
  }
};
