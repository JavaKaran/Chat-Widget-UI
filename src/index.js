import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ChatWindow from './ChatWindow';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

let verifiedSite;
let sites = ['demo.noesis.dev', 'chat-widget-plum.vercel.app']
let domain;

// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
// const domain = urlParams?.get("domain");

window.addEventListener('message', (event) => {
  // Check the origin of the event to ensure it's from an allowed domain
  if (sites.include(event.origin)) {
    verifiedSite = true;
  }
});

root.render(
  <React.StrictMode>
    {verifiedSite && <ChatWindow domain={domain} />}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
