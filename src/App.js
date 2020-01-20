import React from 'react';
import './App.css';
import useWindowSize from 'hooks/useWindowSize';

import PreloadLayztComponents from 'PreloadLayzyComponents';
import Routes from 'Routes';

import Nav from 'components/Nav';
import MessageContainer from 'views/MessageContainer';

function App() {
  const windowSize = useWindowSize();

  // console.log('*** window width:', windowSize.width);

  return (
    <div className="App" style={{ display: 'flex' }}>
      <MessageContainer />
      <div>
        <Nav />
      </div>
      <div style={{ width: '100%' }}>
        <React.Suspense fallback={<div>Loading........</div>}>
          <PreloadLayztComponents />
          <Routes />
        </React.Suspense>
      </div>
    </div>
  );
}

export default App;
