import React from 'react';

const Input = ({ textAreaRef, handleMessageSend, setIsTyping, isTyping }) => {
    
    const textarea = textAreaRef.current;

    const handleSendClick = () => {
        if(textarea.value !== ''){
            handleMessageSend(textarea.value);
            setIsTyping(true);
            textarea.value = '';
            textarea.style.height = 'auto'
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            if (textAreaRef.current.value.trim() !== ''){
                if (!isTyping) {
                    e.preventDefault();
                    handleMessageSend(textarea.value);
                    textarea.value = '';
                    textarea.style.height = 'auto'
                }
            } else {
                e.preventDefault();
            }
        }
    }

    const handleTextareaChange = () => {
        if (textarea) {
          textarea.style.height = 'auto'; 
          textarea.style.height = Math.min(100, textarea.scrollHeight) + 'px';

          if (textarea.scrollHeight > 100) {
            textarea.style.overflowY = 'auto'; 
          } else {
            textarea.style.overflowY = 'hidden'; 
          }
        }
    };

    return (
        <div className="border-t-2 border-gray-200 p-2 sm:p-6 sm:mb-0 shadow-lg">
            <div className="relative flex justify-around">
                <textarea 
                    placeholder="Write your message!" 
                    className="w-[90%] border-none focus:placeholder-gray-400 placeholder-gray-600 text-black outline-none bg-[#f1f1f1] rounded-md px-2 py-[5px] sm:p-4 resize-none text-[12px] leading-[17px] sm:text-sm message-input " 
                    ref={textAreaRef} 
                    onKeyDown={handleKeyDown}
                    rows={'1'}
                    onChange={handleTextareaChange}
                    />
                <div className="items-center flex">
                    <button type="button" className="flex items-center justify-center rounded-lg px-3 py-1 ml-2 sm:ml-0 sm:px-4 sm:py-3 transition duration-500 ease-in-out text-white bg-[#2C2D98] hover:bg-[#5658d8] focus:outline-none h-full max-h-[25px] sm:max-h-[50px] border-0" onClick={handleSendClick} disabled={isTyping}>
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