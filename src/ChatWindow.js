import React, { useState, useEffect, useRef } from 'react';
import Message from './components/Message.jsx';
import Typing from './components/TypingIndicator.jsx';
import Header from './components/Header.jsx';
import Input from './components/Input.jsx';

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
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prevMessage) => [...prevMessage, { sender: 'bot', text: "I will help you with the same." }]);
    }, 2500);
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
          <Message key={index} sender={message.sender} text={message.text} />
        ))}
        {isTyping && <Typing />}
      </div>
      <Input textAreaRef={textAreaRef} handleKeyDown={handleKeyDown} handleMessageSend={handleMessageSend} isTyping={isTyping} setIsTyping={setIsTyping} />
    </div>
  );
}

export default ChatWindow;
