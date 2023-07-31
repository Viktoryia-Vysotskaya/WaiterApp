import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import createRoot from 'react-dom/client';
import App from './App';
import store from './redux/store';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
createRoot(document.querySelector('#root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

