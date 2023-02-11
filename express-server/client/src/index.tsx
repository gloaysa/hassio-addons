import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import {store} from './store/store';
import {ConnectionService} from './services/connection/connection.service';
import {EntitiesService} from './services/entities/entities.service';

const root = createRoot(document.getElementById('root'));

const connectionService = ConnectionService.getInstance();
connectionService.startConnection()
    .then(() => EntitiesService.getInstance());

root.render(
  <React.StrictMode>
      <Provider store={store} >
    <App />
      </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
