import React, { useState, useEffect, useRef } from 'react';
import Message from './components/Message.jsx';
import Typing from './components/TypingIndicator.jsx';
import Header from './components/Header.jsx';
import Input from './components/Input.jsx';
import axios from 'axios';

const ChatWindow = () => {

  const [messages, setMessages] = useState([
    { sender: 'user', text: 'Hello, how are you?' },
    { sender: 'bot', text: 'I am doing well, thank you! Lets brainstorm!' }
  ]);

  const [isTyping, setIsTyping] = useState(false);
  const textAreaRef = useRef();

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
        'Api-token': 'BLiEUe64EC4Wj7HPYPXa'
      }
    })
      .then((response) => {
        if (response.data.status == 'success') {
          setMessages((prevMessage) => [...prevMessage, { sender: 'bot', text: response.data.message }]);
          setIsTyping(false);
        }
      })
      .catch((err) => {
        console.log(err);
      })
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (!isTyping) {
        e.preventDefault();
        handleMessageSend(e.target.value);
        e.target.value = '';
      }
    }
  }

  useEffect(() => {
    const messageList = document.getElementById('message-list');
    messageList.scrollTop = messageList.scrollHeight;
  }, [messages]);

  return (
    <div className="flex-1 justify-between flex flex-col h-screen">
      <Header />
      <div id="message-list" className="flex flex-col h-full p-3 sm:p-6 overflow-y-auto">
        {messages.map((message, index) => (
          <Message key={index} isLastBotMessage={index === messages.length - 1 && message.sender !== 'user'} sender={message.sender} text={message.text} />
        ))}
        {isTyping && <Typing />}
      </div>
      <Input textAreaRef={textAreaRef} handleKeyDown={handleKeyDown} handleMessageSend={handleMessageSend} isTyping={isTyping} setIsTyping={setIsTyping} />
    </div>
  );
}

export default ChatWindow;
