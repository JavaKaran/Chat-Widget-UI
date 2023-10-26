import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ChatWindow from './ChatWindow';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

let allowedDomains = process.env.REACT_APP_ALLOWED_DOMAINS?.split(',');

const App = () => {
  const [verified, setVerified] = useState(false);
  const [iframeDomain, setIframeDomain] = useState(null);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const botId = urlParams?.get("bot");

  const handlePostMessage = (event) => {

    if (allowedDomains.includes(event.origin)) {

      setIframeDomain(event.data);
      setVerified(true);

    } else {
      console.log("Origin not allowed:", event.origin);
    }

  };

  useEffect(() => {

    window.addEventListener('message', handlePostMessage);
    return () => {
      window.removeEventListener('message', handlePostMessage);
    };

  }, []);

  return (
    <React.StrictMode>
      {/* for deployed site */}
      {/* {verified && botId && botId !== "null" && <ChatWindow iframeDomain={iframeDomain} botApiId={botId} /> } */}

      {/* for local site */}
      {<ChatWindow iframeDomain={iframeDomain} botApiId='abb82836_bf04_4dd6_9fc1_b16d11e68a5f' /> }
    </React.StrictMode>
  );
}

root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();