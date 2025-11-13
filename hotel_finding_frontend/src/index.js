import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './state/store';
import { bootstrapMocks } from './mocks/browser';

async function start() {
  // Start MSW conditionally (dev or when env flag enabled)
  await bootstrapMocks();
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
}

start();
