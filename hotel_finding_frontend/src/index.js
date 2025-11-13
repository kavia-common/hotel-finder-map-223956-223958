import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Router from './Router';
import { Provider } from 'react-redux';
import { store } from './state/store';
import { bootstrapMocks } from './mocks/browser';

async function start() {
  // Start MSW conditionally (dev or when env flag enabled)
  await bootstrapMocks();
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.log('[Startup] NODE_ENV=', process.env.NODE_ENV, 'MSW flag=', process.env.REACT_APP_ENABLE_MSW);
  }
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <Router />
      </Provider>
    </React.StrictMode>
  );
}

start();
