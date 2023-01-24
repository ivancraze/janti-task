import React from 'react';
import { Provider } from 'react-redux';

import './App.css';

import { store } from './store';
import BaseLayout from './layouts/BaseLayout';
import Map from './components/Map';

function App() {
  return (
    <Provider store={store}>
      <BaseLayout>
        <Map />
      </BaseLayout>
    </Provider>
  );
}

export default App;
