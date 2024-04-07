import React from 'react';
import { Provider, ErrorBoundary } from '@rollbar/react';

const rollbarConfig = {
  accessToken: '<ClientAccessToken>',
  environment: 'testenv',
};

function TestError() {
  const a = null;
  return a.hello();
}

const App = () => (
  <Provider config={rollbarConfig}>
    <ErrorBoundary>
      <TestError />
    </ErrorBoundary>
  </Provider>
);

export default App;
