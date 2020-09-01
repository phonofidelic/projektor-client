import React from 'react';
import './App.css';
import useMobileDetect from 'use-mobile-detect-hook';

import { useAuth } from 'services/AuthProvider';

import PreloadLazyComponents from 'PreloadLazyComponents';
import Routes from 'Routes';
import Nav from 'components/Nav';
import MessageContainer from 'views/MessageContainer';
import Loader from 'components/Loader';

function App() {
  const { isMobile } = useMobileDetect();
  const { isAuthenticated } = useAuth();

  return (
    <div className="App" style={{ display: 'flex' }}>
      {/* <Loader /> */}
      <MessageContainer />
      <div>
        <Nav isMobile={isMobile()} />
      </div>
      <div style={{ width: '100%' }}>
        <React.Suspense fallback={<Loader />}>
          {/* Only preload if user is authed */}
          {isAuthenticated && <PreloadLazyComponents />}
          <Routes />
        </React.Suspense>
      </div>
    </div>
  );
}

export default App;
