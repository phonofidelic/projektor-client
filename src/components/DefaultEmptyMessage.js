import React from 'react';

export default function DefaultEmptyMessage(props) {
  const { text } = props;
  return (
    <div style={{ margin: '80px' }}>
      <div>{text}</div>
    </div>
  );
}
