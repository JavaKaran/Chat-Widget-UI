import React, { useState, useEffect, useRef } from 'react';
import Message from './components/Message.jsx';
import Typing from './components/TypingIndicator.jsx';
import Header from './components/Header.jsx';
import Input from './components/Input.jsx';
import axios from 'axios';

const ChatWindow = () => {

  const [messages, setMessages] = useState([
    {sender: 'user', text: '`demo` code is this coming'}
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [domain, setDomain] = useState('');
  const [bot, setBot] = useState({
    name: 'BrainStormer',
    description: "Let's Brainstorm the future!",
  });

  const textAreaRef = useRef();
  const messageListRef = useRef();

  const handleMessageSend = (text) => {
    if (isTyping) return;
    setIsTyping(true);
    setMessages((prevMessage) => [...prevMessage, { sender: 'user', text }]);
    axios({
      url: `https://botnew.brainstormer.io/widget_handler`,
      method: 'post',
      data: {
        "query": text,
        "bot_id": "bot_abb82836_bf04_4dd6_9fc1_b16d11e68a5f",
      },
      headers: {
        'Api-token': process.env.REACT_APP_BOT_API_KEY
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
  };

  const scrollToEnd = () => {
    const messageList = messageListRef.current;
    messageList.scrollTop = messageList.scrollHeight;
  }

  useEffect(() => {
    scrollToEnd();
  }, [messages]);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const domain = urlParams?.get("domain");
    setDomain(domain);

    if (!domain?.includes('.noesis')) {
      setBot({
        name: 'HomeWorkHero',
        description: "Let's make the homework interesting!"
      })
    }

    setIsTyping(true);

    axios({
      url: `https://botnew.brainstormer.io/widget_handler`,
      method: 'post',
      data: {
        "query": 'hi, who are you and how can you help me?',
        "bot_id": "bot_abb82836_bf04_4dd6_9fc1_b16d11e68a5f",
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
  }, []);


  return (
    <div className="flex-1 justify-between flex flex-col h-screen">
      <Header bot={bot} />
      <div id="message-list" ref={messageListRef} className="flex flex-col h-full p-3 sm:p-6 overflow-y-auto">
        {messages.map((message, index) => (
          <Message
            key={index}
            sender={message.sender}
            text={message.text} />
        ))}
        {isTyping && <Typing bot={bot} />}
      </div>
      <Input textAreaRef={textAreaRef} handleMessageSend={handleMessageSend} isTyping={isTyping} setIsTyping={setIsTyping} />
    </div>
  );
}

export default ChatWindow;
