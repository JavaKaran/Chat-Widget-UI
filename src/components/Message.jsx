import React from 'react';

const Message = ({ sender, text }) => {

  const textColor = sender === 'user' ? 'text-white' : 'text-gray-600';
  const bgColor = sender === 'user' ? 'bg-[#2c2d98]' : 'bg-gray-300';
  const roundedClass = sender === 'user' ? 'rounded-br-none' : 'rounded-bl-none';

  return (
    <div className="chat-message my-[5px] sm:my-2">
      <div className={`flex items-end ${sender === 'user' ? 'justify-end' : ''}`}>
        <div className={`flex flex-col  max-w-[80%] sm:max-w-[90%] mx-2 order-${sender === 'user' ? '1' : 'last'} items-${sender === 'user' ? 'end' : 'start'}`}>
          <span className={`p-2 sm:py-2 sm:px-3 text-[11px] leading-[15px] sm:text-sm rounded-lg inline-block w-full break-words ${roundedClass} ${bgColor} ${textColor}`}>{text}</span>
        </div>
        {sender !== "user" && <img src="../../App icon.png" alt="My profile" className="w-6 h-6 rounded-full order-first" />}
      </div>
    </div>
  );
};

export default Message;
