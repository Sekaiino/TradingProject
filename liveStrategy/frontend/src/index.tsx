import React from 'react';
import ReactDom from 'react-dom/client';
import './css/App.css';
import App from './App';

const root = ReactDom.createRoot(document.getElementById('root') as Element);
root.render(
    <React.StrictMode>
            <App />
     </React.StrictMode>
);
