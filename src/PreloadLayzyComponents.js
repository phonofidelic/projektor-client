/**
 * https://itnext.io/react-router-transitions-with-lazy-loading-2faa7a1d24a
 */
import React, { useState, useEffect, memo } from 'react';

import { routes } from 'Routes';

function PreloadLayztComponents() {
  const [actPreload, setActPreload] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setActPreload(false);
    }, 500);
    return () => {
      clearTimeout(t);
    };
  });

  if (actPreload) {
    return (
      <div style={preloadStyles}>
        {routes.map(route => {
          return <route.Component preload key={route.path} />;
        })}
      </div>
    );
  }
}

export default memo(PreloadLayztComponents);

const preloadStyles = {
  maxHeight: 0,
  maxWidth: 0,
  opacity: 0,
  position: 'absolute'
};
