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
  const [sameOrigin, setSameOrigin] = useState(false);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const botId = urlParams?.get("bot");

  const parentWindow = window.parent;
  
  const isInsideIframe = window !== parentWindow;

  const messageIncoming = (e) => {
    if(allowedDomains.includes(e.origin) && e.origin.includes(e.data)){
      setIframeDomain(e.data);
      setSameOrigin(true);
    } else {
      console.log("Origin not allowed:", e.origin);
    }
  }

  useEffect(() => {
    
    if(isInsideIframe && sameOrigin){
      setVerified(true);
    }

    window.addEventListener("message", messageIncoming);

    return () => {
      window.removeEventListener('message', messageIncoming);
    }

  }, []);

  return (
    <React.StrictMode>
      {verified && botId && botId !== "null" && <ChatWindow iframeDomain={iframeDomain} botApiId={botId} /> }
    </React.StrictMode>
  );
}

root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();