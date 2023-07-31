import React from 'react';

const TypingIndicator = () => {
    return (
        <div className='flex items-end'>
            <img src="../../App icon.png" alt="Avatar" className="w-6 h-6 rounded-full" />
            <div className="flex flex-end space-x-2 ml-2 bg-gray-300 rounded-bl-none p-3 sm:p-4 rounded-lg">
                <span className="w-1 h-1 sm:w-2 sm:h-2 bg-gray-600 rounded-full animate-bounce"></span>
                <span className="w-1 h-1 sm:w-2 sm:h-2 bg-gray-600 rounded-full animate-bounce"></span>
                <span className="w-1 h-1 sm:w-2 sm:h-2 bg-gray-600 rounded-full animate-bounce"></span>
            </div>
        </div>
    );
};

export default TypingIndicator;
