import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './services/store';
import { BrowserRouter } from 'react-router-dom';
import { App } from './components/app/app';

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOMClient.createRoot(container!);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
