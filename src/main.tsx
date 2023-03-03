import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import DynamicGlobalStyle from '@ui/components/styled';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
    <DynamicGlobalStyle />
  </React.StrictMode>,
)
