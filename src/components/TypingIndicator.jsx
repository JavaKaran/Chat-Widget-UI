import React from 'react';

const TypingIndicator = () => {
    return (
        <div className='flex items-end'>
            <img src="../../App icon.png" alt="Avatar" className="w-6 h-6 rounded-full" />
            <div className="flex flex-end space-x-2 ml-2 bg-gray-300 rounded-bl-none p-3 sm:p-4 rounded-lg chat-typing-indicator">
                <span className=""></span>
                <span className=""></span>
                <span className=""></span>
            </div>
        </div>
    );
};

export default TypingIndicator;
