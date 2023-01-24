import React from 'react';
import { render } from '@testing-library/react';

import App from './App';
import { bindMatchMediaObject } from './setupTests';

test('test table in dom', () => {
  bindMatchMediaObject();

  const appContainer = render(<App />);
  const tableComponent = appContainer.container.querySelector('.table');
  expect(tableComponent).toBeInTheDocument();
});

test('test map in dom', () => {
  bindMatchMediaObject();

  const appContainer = render(<App />);
  const mapComponent = appContainer.container.querySelector('.map');
  expect(mapComponent).toBeInTheDocument();
});
