import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { DAppProvider } from '@usedapp/core'
import { getDefaultProvider } from 'ethers'
import config from './config/config';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <DAppProvider config={config}>
    <App />
  </DAppProvider>
);