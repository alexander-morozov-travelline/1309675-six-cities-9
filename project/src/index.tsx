import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const COUNT_ADS = 10;

ReactDOM.render(
  <React.StrictMode>
    <App countAds={COUNT_ADS}/>
  </React.StrictMode>,
  document.getElementById('root'));
