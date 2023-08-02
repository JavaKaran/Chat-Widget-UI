import React from 'react';

const Input = ({ textAreaRef, handleMessageSend, setIsTyping, isTyping }) => {
    
    const textarea = textAreaRef.current;

    const handleSendClick = () => {
        handleMessageSend(textarea.innerText);
        setIsTyping(true);
        textarea.innerText = '';
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          if (!isTyping) {
            e.preventDefault();
            handleMessageSend(textarea.innerText);
            textarea.innerText = '';
          }
        }
      }

    return (
        <div className="border-t-2 border-gray-200 p-3 sm:p-6 sm:mb-0">
            <div className="relative flex justify-around">
                <div 
                    placeholder="Write your message!" 
                    className="w-[90%] text-black outline outline-1 outline-gray-400/50 bg-transparent rounded-md px-2 py-[5px] sm:p-4 resize-none text-[12px] leading-[17px] sm:text-sm min-h-[25px] max-h-[70px] sm:min-h-[45px] sm:max-h-[80px] overflow-y-auto message-input " 
                    ref={textAreaRef} 
                    onKeyDown={handleKeyDown}
                    contentEditable="true" 
                    />
                <div className="items-center flex">
                    <button type="button" className="flex items-center justify-center rounded-lg px-3 py-1 ml-2 sm:ml-0 sm:px-4 sm:py-3 transition duration-500 ease-in-out text-white bg-[#2C2D98] hover:bg-[#5658d8] focus:outline-none h-full max-h-[25px] sm:max-h-[50px]" onClick={handleSendClick} disabled={isTyping}>
                        <span className="font-bold sm:block hidden sm:mr-2 mr-0">Send</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3 sm:h-6 sm:w-6 transform rotate-90">
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Input;