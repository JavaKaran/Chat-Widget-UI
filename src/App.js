import React, { useState, useEffect } from 'react';
import Message from './components/Message.jsx';
import Typing from './components/TypingIndicator.jsx';

function App() {
  const [messages, setMessages] = useState([
    { sender: 'user', text: 'Hello, how are you?' },
    { sender: 'bot', text: 'I am doing well, thank you! Lets brainstorm!' }  
  ]);

  const [isTyping, setIsTyping] = useState(false);

  const handleMessageSend = (text) => {
    setIsTyping(true);
    setMessages((prevMessage) => [...prevMessage, { sender: 'user', text }]);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prevMessage) => [...prevMessage, { sender: 'bot', text: "I will help you with the same." }]);
    }, 2000);
  };

  useEffect(() => {
    const messageList = document.getElementById('message-list');
    messageList.scrollTop = messageList.scrollHeight;
  }, [messages]);

  return (
    <div class="flex-1 justify-between flex flex-col h-screen">
      <div class="flex sm:items-center justify-between py-3 bg-[#ebebebde] border-b-2 px-6 border-gray-200">
        <div class="relative flex items-center space-x-4">
          <img src="../../App icon.png" alt="Brainstormer Logo" class="w-10 sm:w-16 h-10 sm:h-16 rounded-full" />
          <div class="flex flex-col leading-tight">
            <div class="text-2xl mt-1 flex items-center">
              <span class="text-gray-700 mr-3">Brainstormer</span>
            </div>
            <span class="text-sm text-gray-600">Let's Brainstorm the future!</span>
          </div>
        </div>
      </div>
      <div id="message-list" class="flex flex-col h-full p-6 overflow-y-auto">
        {messages.map((message, index) => (
          <Message key={index} sender={message.sender} text={message.text} />
        ))}
        {isTyping && <Typing />}
      </div>
      <div class="border-t-2 border-gray-200 p-6 sm:mb-0">
        <div class="relative flex">
          <input type="text" placeholder="Write your message!" class="w-full focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 outline outline-1 outline-gray-400/50 pl-4 bg-transparent rounded-md py-3" onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleMessageSend(e.target.value);
              e.target.value = '';
            }
          }} />
          <div class="absolute right-0 items-center inset-y-0 flex">
            <button type="button" class="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-[#2C2D98] hover:bg-[#5658d8] focus:outline-none" onClick={(e) => {
              const input = document.querySelector('input');
              handleMessageSend(input.value);
              input.value = '';
            }}>
              <span class="font-bold sm:block hidden">Send</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-6 w-6 ml-2 transform rotate-90">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
