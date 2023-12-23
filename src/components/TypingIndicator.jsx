import React from 'react';

const TypingIndicator = ({ image, primary }) => {
    return (
        <div className='flex items-end my-1 sm:my-2'>
            <img src={image} alt="Avatar" className="w-7 h-7 rounded-full" />
            <div className="flex items-end ml-2 bg-[#f5f5f5] border border-[#f5f5f5] rounded-bl-none p-2 sm:p-4 rounded-lg chat-typing-indicator">
                <span className="dot" style={{ backgroundColor: primary }}></span>
                <span className="dot" style={{ backgroundColor: primary }}></span>
                <span className="dot" style={{ backgroundColor: primary }}></span>
                {/* <span className='text-[11px] leading-[15px] sm:text-sm ml-[5px]'>{bot.name} is typing</span> */}
            </div>
        </div>
    );
};

export default TypingIndicator;
