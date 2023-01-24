import React from 'react';
import { Provider } from 'react-redux';

import { store } from './store';
import BaseLayout from './layouts/BaseLayout';
import MapWrapper from './components/MapWrapper';

function App() {
  return (
    <Provider store={store}>
      <BaseLayout>
        <MapWrapper />
      </BaseLayout>
    </Provider>
  );
}

export default App;
