import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './services/i18n';
import { useTranslation } from 'react-i18next';

const root = ReactDOM.createRoot(document.getElementById('root'));

let allowedDomains = process.env.REACT_APP_ALLOWED_DOMAINS?.split(',');

const Main = () => {

  const { i18n } = useTranslation();

  const [verified, setVerified] = useState(false);
  const [iframeDomain, setIframeDomain] = useState('demo.noesis.dev');

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const botId = urlParams?.get("bot");
  const language = urlParams?.get('language');
  const color1 = urlParams?.get('primary');
  // const language = "en";

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

  // useEffect(() => {

  //   document.dir = i18n.dir();

  // }, [i18n, i18n.language]);

  useEffect(() => {

    i18n.changeLanguage(language ? language : "en");

  }, [language])

  return (
    <React.StrictMode>
      <BrowserRouter>
        {/* for deployed site */}
        {/* {verified && botId && botId !== "null" && <App iframeDomain={iframeDomain} botApiId={botId} /> } */}

        {/* for local site */}
        {<App iframeDomain={iframeDomain} botApiId='abb82836_bf04_4dd6_9fc1_b16d11e68a5f' primaryColor={color1 ? `#${color1}` : '#912d2a'} />}
      </BrowserRouter>
    </React.StrictMode>
  );
}

root.render(<Main />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();