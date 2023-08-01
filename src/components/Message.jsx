import React, { useState, useEffect } from 'react';

const Message = ({ sender, text, isLastBotMessage }) => {

  const [displayContent, setDisplayContent] = useState("");

  const textColor = sender === 'user' ? 'text-white' : 'text-gray-600';
  const bgColor = sender === 'user' ? 'bg-[#2c2d98]' : 'bg-gray-300';
  const roundedClass = sender === 'user' ? 'rounded-br-none' : 'rounded-bl-none';

  useEffect(() => {
    let i = 0;

    if (sender !== 'user' && isLastBotMessage) {
      const intervalId = setInterval(() => {
        setDisplayContent(text.slice(0, i));

        i++;

        if (i > text.length) {
          clearInterval(intervalId);
        }
      }, 30);

      return () => clearInterval(intervalId);
    }
  }, [sender, text, isLastBotMessage])

  return (
    <div className="chat-message my-2">
      <div className={`flex items-end ${sender === 'user' ? 'justify-end' : ''}`}>
        <div className={`flex flex-col space-y-2 text-xs sm:text-sm max-w-[80%] sm:max-w-[90%] mx-2 order-${sender === 'user' ? '1' : 'last'} items-${sender === 'user' ? 'end' : 'start'}`}>
          {sender === 'user' ?
            <span className={`px-4 py-2 rounded-lg inline-block w-full break-words ${roundedClass} ${bgColor} ${textColor}`}>{text}</span> :
            <span className={`px-4 py-2 rounded-lg inline-block w-full break-words ${roundedClass} ${bgColor} ${textColor}`} >{displayContent}</span>
          }
        </div>
        {sender !== "user" && <img src="../../App icon.png" alt="My profile" className="w-6 h-6 rounded-full order-first" />}
      </div>
    </div>
  );
};

export default Message;
