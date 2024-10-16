import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

console.log('Loading index.js');

console.log('Starting the application...');

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

console.log('Application rendered successfully.');