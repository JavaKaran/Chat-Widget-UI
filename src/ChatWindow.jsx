import React, { useState, useEffect, useRef } from 'react';
import Message from './components/Message.jsx';
import Typing from './components/TypingIndicator.jsx';
import Header from './components/Header.jsx';
import Input from './components/Input.jsx';
import axios from 'axios';
import Report from './Report.jsx';
import Menu from './components/Menu.jsx';
import MessageMenu from './components/MessageMenu.jsx';

const ChatWindow = ({ iframeDomain, botApiId }) => {

  let site = window.location.origin;
  let assetUrl = process.env.REACT_APP_ASSETS_URL;
  const apiURL = process.env.REACT_APP_API_URL;

  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [domain, setDomain] = useState(iframeDomain);
  const [botId, setBotId] = useState(botApiId);
  const [bot, setBot] = useState({
    name: '',
    description: "",
    image: `${site}/background.png`,
    primaryColor: '#912d2a'
  });
  const [disabled, setDisabled] = useState(true);
  const [noWelcomeMessage, setNoWelcomeMessage] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [showHeaderMenu, setShowHeaderMenu] = useState(false);
  const [showMessageMenu, setShowMessageMenu] = useState(false);

  const textAreaRef = useRef();
  const messageListRef = useRef();

  const handleMessageSend = (text) => {
    if (isTyping) return;
    setIsTyping(true);
    setMessages((prevMessage) => [...prevMessage, { sender: 'user', text }]);
    sendMessage(text);
  };

  const scrollToEnd = () => {
    const messageList = messageListRef.current;
    messageList.scrollTop = messageList.scrollHeight;
  }

  useEffect(() => {
    scrollToEnd();
  }, [messages]);

  useEffect(() => {
    axios({
      url: `${apiURL}/bot_by_id/bot_${botId}`,
      method: 'POST',
      data: {
        domain: domain
      },
      headers: {
        'Api-token': 'BLiEUe64EC4Wj7HPYPXa'
      }
    })
      .then((response) => {
        // console.log(response);
        if (response.status === 200 && response.data.data.length > 0) {
          let bot = response?.data?.data[0]?.attributes;
          let botImage = bot?.ProfileImage?.data?.attributes?.url;
          setBot({
            name: bot.Name ? bot.Name : "Brainstormer",
            description: bot.Description ? bot.Description : "Let's Brainstorm the future!",
            image: botImage ? `${assetUrl}${botImage}` : `${site}/App-icon.png`,
            primaryColor: '#912d2a'
          })
          setDisabled(false);
          { bot.WelcomeMessage ? setMessages((prevMessage) => [...prevMessage, { sender: 'bot', text: bot.WelcomeMessage }]) : setNoWelcomeMessage(true) }
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  useEffect(() => {
    if (noWelcomeMessage) {
      setMessages((prevMessage) => [...prevMessage, { sender: 'bot', text: 'Welcome my master. Your message is my command!' }]);
      setNoWelcomeMessage(false);
    }
  }, [noWelcomeMessage])

  const sendMessage = (text) => {
    axios({
      url: `${apiURL}/widget_handler`,
      method: 'POST',
      data: {
        "query": text ? text : 'hi, who are you and how can you help me?',
        "bot_id": `bot_${botId}`,
      },
      headers: {
        'Api-token': 'BLiEUe64EC4Wj7HPYPXa'
      }
    })
      .then((response) => {
        if (response.data.status === 'success') {
          setMessages((prevMessage) => [...prevMessage, { sender: 'bot', text: response.data.message }]);
          setIsTyping(false);
          setNoWelcomeMessage(false);
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const handleShowMenu = () => {
    setShowHeaderMenu(!showHeaderMenu);
  }

  const handleMessageMenu = () => {
    setShowMessageMenu(!showMessageMenu);
  }

  return (
    <div className="flex-1 justify-between flex flex-col h-screen relative">
      <Header bot={bot} handleShowMenu={handleShowMenu} />
      <Menu showHeaderMenu={showHeaderMenu} />
      <div id="message-list" ref={messageListRef} className="flex flex-col h-full pl-[10px] pr-0 py-3 sm:p-6 overflow-y-auto">
        {messages.map((message, index) => (
          <Message
            key={index}
            sender={message.sender}
            text={message.text}
            image={bot.image} 
            primaryColor={bot.primaryColor}
            setShowReport={setShowReport}
            handleMessageMenu={handleMessageMenu}
            />
        ))}
        {isTyping && <Typing image={bot.image} primaryColor={bot.primaryColor} />}
      </div>
      <Input textAreaRef={textAreaRef} handleMessageSend={handleMessageSend} isTyping={isTyping} setIsTyping={setIsTyping} disabled={disabled} primaryColor={bot.primaryColor} />
      {showReport && <Report setShowReport={setShowReport} />}
      <MessageMenu showMessageMenu={showMessageMenu} handleMessageMenu={handleMessageMenu} primaryColor={bot.primaryColor} setShowReport={setShowReport} />

    </div>
  );
}

export default ChatWindow;
