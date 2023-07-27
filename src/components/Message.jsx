import React from 'react';

const Message = ({ sender, text }) => {

  const textColor = sender === 'user' ? 'text-white' : 'text-gray-600';
  const bgColor = sender === 'user' ? 'bg-[#2c2d98]' : 'bg-gray-300';
  const roundedClass = sender === 'user' ? 'rounded-br-none' : 'rounded-bl-none';

  return (
    <div className="chat-message my-2">
      <div className={`flex items-end ${sender === 'user' ? 'justify-end' : ''}`}>
        <div className={`flex flex-col space-y-2 text-sm max-w-xs mx-2 order-${sender === 'user' ? '1' : '2'} items-${sender === 'user' ? 'end' : 'start'}`}>
            <span className={`px-4 py-2 rounded-lg inline-block ${roundedClass} ${bgColor} ${textColor}`}>{text}</span>
        </div>
        {sender !== "user" && <img src="../../App icon.png" alt="My profile" className="w-6 h-6 rounded-full order-1" />}
      </div>
    </div>
  );
};

export default Message;
