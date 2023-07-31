import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.querySelector('#root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);

document.body.style.backgroundImage = 'linear-gradient(to right, white, gray)';
document.body.style.margin = '0';
document.body.style.padding = '0';
document.body.style.height = '100%';
document.documentElement.style.backgroundImage = 'linear-gradient(to right, white, gray)';
document.documentElement.style.margin = '0';
document.documentElement.style.padding = '0';
document.documentElement.style.height = '100%';