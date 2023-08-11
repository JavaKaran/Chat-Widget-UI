import React, { useState, useEffect, useRef } from 'react';
import Message from './components/Message.jsx';
import Typing from './components/TypingIndicator.jsx';
import Header from './components/Header.jsx';
import Input from './components/Input.jsx';
import axios from 'axios';

const ChatWindow = ({ iframeDomain, botApiId }) => {

  let site = window.location.origin;
  let assetUrl = 'https://studio.brainstormer.io';

  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [domain, setDomain] = useState(iframeDomain);
  const [botId, setBotId] = useState(botApiId);
  const [bot, setBot] = useState({
    name: '',
    description: "",
    image: `${site}/background.png`
  });

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
      url: `https://botnew.brainstormer.io/bot_by_id/bot_${botId}`,
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
        if(response.status === 200 && response.data.data.length > 0){
          let bot = response?.data?.data[0]?.attributes;
          let botImage = bot?.ProfileImage?.data?.attributes?.url;
          setBot({
            name: bot.Name ? bot.Name : "Brainstormer",
            description: bot.Description ? bot.Description : "Let's Brainstorm the future!",
            image: botImage ? `${assetUrl}${botImage}` : `${site}/App-icon.png`
          })
          setMessages((prevMessage) => [...prevMessage, { sender: 'bot', text: bot.WelcomeMessage }]);
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  const sendMessage = (text) => {
    axios({
      url: `https://botnew.brainstormer.io/widget_handler`,
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
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <div className="flex-1 justify-between flex flex-col h-screen">
      <Header bot={bot} />
      <div id="message-list" ref={messageListRef} className="flex flex-col h-full p-3 sm:p-6 overflow-y-auto">
        {messages.map((message, index) => (
          <Message
            key={index}
            sender={message.sender}
            text={message.text} 
            image={bot.image} />
        ))}
        {isTyping && <Typing image={bot.image} />}
      </div>
      <Input textAreaRef={textAreaRef} handleMessageSend={handleMessageSend} isTyping={isTyping} setIsTyping={setIsTyping} />
    </div>
  );
}

export default ChatWindow;
