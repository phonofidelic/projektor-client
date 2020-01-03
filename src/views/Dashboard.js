import React, { useContext } from 'react';
import { StringContext } from 'strings';

import Header from 'components/Header';

export default function(props) {
  const strings = useContext(StringContext);

  return (
    <div>
      <Header title={strings.ttl__dashboard} />
    </div>
  );
}
