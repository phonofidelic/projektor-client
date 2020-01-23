import React from 'react';
import './App.css';
// import useWindowSize from 'hooks/useWindowSize';

import PreloadLazyComponents from 'PreloadLazyComponents';
import Routes from 'Routes';
import Nav from 'components/Nav';
import MessageContainer from 'views/MessageContainer';
import Loader from 'components/Loader';

function App() {
  // const windowSize = useWindowSize();

  // console.log('*** window width:', windowSize.width);

  return (
    <div className="App" style={{ display: 'flex' }}>
      {/* <Loader /> */}
      <MessageContainer />
      <div>
        <Nav />
      </div>
      <div style={{ width: '100%' }}>
        <React.Suspense fallback={<Loader />}>
          <PreloadLazyComponents />
          <Routes />
        </React.Suspense>
      </div>
    </div>
  );
}

export default App;
