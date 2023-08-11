import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ChatWindow from './ChatWindow';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

let verifiedSite = false;
let allowedDomains = ['demo.noesis.dev', 'chat-widget-plum.vercel.app']
let iframeDomain;

// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
// const domain = urlParams?.get("domain");

window.addEventListener('message', (event) => {
  // Check the origin of the event to ensure it's from an allowed domain
  console.log(event.data, typeof(event.data));
  if (allowedDomains.includes(event.origin)) {
    verifiedSite = true;
    iframeDomain = event.data;
  }
});

root.render(
  <React.StrictMode>
    {verifiedSite && <ChatWindow iframeDomain={iframeDomain} />}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
