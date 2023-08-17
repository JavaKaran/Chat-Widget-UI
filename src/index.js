import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ChatWindow from './ChatWindow';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

const App = () => {
  const [verified, setVerified] = useState(false);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const botId = urlParams?.get("bot");
  const iframeDomain = urlParams?.get("domain");

  const messageIncoming = (e) => {
    console.log("hello")
    console.log("message incoming", e.data, e.origin);
  }

  useEffect(() => {
    const parentWindow = window.parent;
    
    const isInsideIframe = window !== parentWindow;
    
    if(isInsideIframe){
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