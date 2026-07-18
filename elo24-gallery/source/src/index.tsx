import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "./styles/app.scss"
import "@fontsource/exo" // Defaults to weight 400

import FoutStager from 'react-fout-stager';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <FoutStager stages={[{
      className: 'font-stage-primary',
      families: [
        { family: 'Exo' },
        { family: 'Open Sans' },
      ],
      stages: [{
        className: 'font-stage-secondary',
        families: [
          { family: 'Exo', options: { weight: "200" } },
          { family: 'Open Sans', options: { weight: "300" } },
        ]
      }]
    }]}><App />
    </FoutStager>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
