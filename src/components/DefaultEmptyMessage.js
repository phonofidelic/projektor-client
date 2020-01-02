import React from 'react';

import Typography from '@material-ui/core/Typography';

export default function DefaultEmptyMessage(props) {
  const { text } = props;
  return (
    <div style={{ margin: '80px' }}>
      <Typography color="textSecondary">{text}</Typography>
    </div>
  );
}
