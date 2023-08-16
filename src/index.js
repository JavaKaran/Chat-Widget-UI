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

  // const handlePostMessage = (event) => {
  //   if (allowedDomains.includes(event.origin)) {
  //     setIframeDomain(event.data);
  //     // console.log("Origins allowed")
  //   } else {
  //     console.log("Origin not allowed:", event.origin);
  //   }
  // };
  
  // Attach the event listener on component mount
  useEffect(() => {
    const parentWindow = window.parent;
    
    const isInsideIframe = window !== parentWindow;
    
    if(isInsideIframe){
      setVerified(true);
    }
    
  }, []);

  // console.log("window", window)
  // console.log("window.parent", window.parent)
  // console.log("window.self", window.self)
  // console.log("window.top", window.top)

  // console.log("check 1 parent", window === window.parent)
  // console.log("check 2 self", window.self === window.top)

  return (
    <React.StrictMode>
      {verified && botId && botId !== "null" && <ChatWindow iframeDomain={iframeDomain} botApiId={botId} /> }
    </React.StrictMode>
  );
}


// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
// const domain = urlParams?.get("domain");

root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();