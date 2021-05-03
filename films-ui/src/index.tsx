import React from 'react';
import 'reflect-metadata';
import ReactDOM from 'react-dom';
import './index.css';
import { CssBaseline } from '@material-ui/core';
import App from './components/App/App';

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
