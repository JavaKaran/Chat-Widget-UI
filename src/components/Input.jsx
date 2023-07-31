import React from 'react';

const Input = ({ textAreaRef, handleKeyDown, handleMessageSend, setIsTyping, isTyping }) => {

    const handleSendClick = () => {
        const textarea = textAreaRef.current
        handleMessageSend(textarea.value);
        setIsTyping(false);
        textarea.value = '';
    }

    return (
        <div className="border-t-2 border-gray-200 p-3 sm:p-6 sm:mb-0">
            <div className="relative flex justify-around">
                <textarea type="text" placeholder="Write your message!" className="w-[90%] focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 outline outline-1 outline-gray-400/50 pl-4 bg-transparent rounded-md py-2 sm:py-3 resize-none text-sm" ref={textAreaRef} onKeyDown={handleKeyDown} rows={'1'} />
                <div className="items-center flex">
                    <button type="button" className="flex items-center justify-center rounded-lg px-3 py-2 ml-2 sm:ml-0 sm:px-4 sm:py-3 transition duration-500 ease-in-out text-white bg-[#2C2D98] hover:bg-[#5658d8] focus:outline-none" onClick={handleSendClick} disabled={isTyping}>
                        <span className="font-bold sm:block hidden">Send</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 ml-2 transform rotate-90">
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Input;