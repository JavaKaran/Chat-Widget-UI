import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { analytic } from '../utils/Analytics';

const Input = ({ textAreaRef, handleMessageSend, setIsTyping, isTyping, disabled, primary, handleShowMenu }) => {

    const { t, i18n } = useTranslation();

    const textarea = textAreaRef.current;
    // const [selectedLanguage, setSelectedLanguage] = useState('English');
    // const [showLanguage, setShowLanguage] = useState(false);

    // const languages = [
    //     { id: 'english', name: 'English' },
    //     { id: 'spanish', name: 'Spanish' },
    //     { id: 'french', name: 'French' },
    //     { id: 'arabic', name: 'Arabic' },
    //     { id: 'russian', name: 'Russian' },
    //     { id: 'german', name: 'German' }
    //     // Add more language options here
    // ];

    const handleSendClick = () => {
        if (textarea.value !== '') {
            handleMessageSend(textarea.value);
            setIsTyping(true);
            textarea.value = '';
            textarea.style.height = 'auto'
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey && !disabled) {
            if (textAreaRef.current.value.trim() !== '') {
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

    // const handleLanguages = () => {
    //     setShowLanguage(!showLanguage);
    // }

    // const handleLanguageChange = (language) => {
    //     setSelectedLanguage(language);
    //     setShowLanguage(!showLanguage);
    // };

    return (
        <div className="border-t-2 border-gray-200 p-2 sm:p-6 sm:mb-0 shadow-lg">
            <div className="relative flex justify-around items-center">
                {/* <div className='mr-[5px]' onClick={handleLanguages}>
                    <p className={`border-1 border-solid p-2 rounded-2xl uppercase mb-0 text-[10px] leading-[12px]`} style={{ color: primary, borderColor: primary }}>{selectedLanguage}</p>
                </div> */}
                <a className='dropup-icon-link px-[5px] cursor-pointer' onClick={handleShowMenu}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="10" cy="10" r="9.5" stroke={primary} />
                        <path d="M9.68847 7.1417L5.11884 12.2333C5.04256 12.3183 5 12.4311 5 12.5485C5 12.6659 5.04256 12.7788 5.11884 12.8637L5.124 12.8692C5.16099 12.9105 5.2055 12.9434 5.25484 12.9659C5.30418 12.9884 5.35731 13 5.411 13C5.4647 13 5.51783 12.9884 5.56717 12.9659C5.61651 12.9434 5.66102 12.9105 5.69801 12.8692L10.0009 8.07451L14.302 12.8692C14.339 12.9105 14.3835 12.9434 14.4328 12.9659C14.4822 12.9884 14.5353 13 14.589 13C14.6427 13 14.6958 12.9884 14.7452 12.9659C14.7945 12.9434 14.839 12.9105 14.876 12.8692L14.8812 12.8637C14.9574 12.7788 15 12.6659 15 12.5485C15 12.4311 14.9574 12.3183 14.8812 12.2333L10.3115 7.1417C10.2713 7.09692 10.223 7.06128 10.1695 7.03692C10.1159 7.01256 10.0583 7 10 7C9.94174 7 9.88409 7.01256 9.83054 7.03692C9.77699 7.06128 9.72866 7.09692 9.68847 7.1417Z" fill={primary} stroke={primary} strokeWidth="0.5" />
                    </svg>
                </a>
                {/* <div className={`fixed top-0 w-full h-full z-20 ${showLanguage ? 'block' : 'hidden'}`} onClick={handleLanguages}>
                    <div className='bg-[rgba(0,0,0,0.7)] flex justify-end flex-col h-full w-full'>

                    </div>
                </div> */}
                {/* <div className={`language-ct rounded-t-xl bg-white p-3 pb-2 transition ease-in-out duration-500 divide-y divide-[#000000] w-full fixed bottom-0 left-0 z-50 ${showLanguage ? 'show-lang-menu' : 'hide-lang-menu'}`}>
                    <h2 className='font-semibold text-[15px] pb-[10px]'>{t('Select Language')}</h2>
                    <ul className='language-list list-none p-0 max-h-[140px] overflow-y-auto'>
                        {languages.map((language) => (
                            <li className={`py-[10px] text-[13px] border-b border-gray-400 ${selectedLanguage == language.name ? `text-[${primary}]` : 'text-[#333333]'}`} key={language.id} onClick={() => handleLanguageChange(language.name)}>
                                {t(`${language.name}`)}
                            </li>
                        ))}
                    </ul>
                </div> */}
                <div className='relative w-[88%] flex'>
                    <textarea
                        placeholder={t('Write your message!')}
                        className={`w-full border border-[#e9e9e9] focus:placeholder-gray-400 placeholder-gray-600 text-black outline-none bg-[#fcfcfc] rounded-md pl-2 py-[10px] sm:p-4 resize-none text-[13px] leading-[17px] sm:text-sm message-input pr-[30px] ${i18n.language == 'ar' && 'text-right'}`}
                        ref={textAreaRef}
                        onKeyDown={handleKeyDown}
                        rows={'1'}
                        onChange={handleTextareaChange}
                    />
                    <div className='absolute top-1.5 right-2 cursor-pointer send-message' onClick={handleSendClick} disabled={isTyping || disabled}>
                        <svg width="15" height="15" viewBox="0 0 19 18" xmlns="http://www.w3.org/2000/svg" fill={primary}>
                            <path d="M18.588 8.33263L2.08802 0.0826268C1.9587 0.0179519 1.81344 -0.00796197 1.66973 0.00800564C1.52602 0.0239732 1.38999 0.0811415 1.27802 0.172627C1.17109 0.262246 1.09128 0.379917 1.04756 0.51241C1.00383 0.644903 0.997935 0.786965 1.03052 0.922627L3.25052 9.00013L1.00052 17.0551C0.969944 17.1684 0.966374 17.2873 0.990102 17.4022C1.01383 17.5171 1.06419 17.6249 1.13714 17.7168C1.21009 17.8087 1.30359 17.8822 1.41012 17.9315C1.51666 17.9807 1.63325 18.0042 1.75052 18.0001C1.86793 17.9994 1.98353 17.9712 2.08802 17.9176L18.588 9.66763C18.7109 9.60469 18.814 9.50907 18.886 9.39129C18.958 9.27352 18.9961 9.13816 18.9961 9.00013C18.9961 8.86209 18.958 8.72674 18.886 8.60896C18.814 8.49119 18.7109 8.39557 18.588 8.33263ZM2.91302 15.8326L4.57052 9.75013H11.5005V8.25013H4.57052L2.91302 2.16763L16.5705 9.00013L2.91302 15.8326Z" />
                        </svg>
                    </div>
                </div>
                {/* <div className="items-center flex">
                    <button type="button" style={{ backgroundColor: primary }} className={`flex items-center justify-center rounded-lg px-3 py-1 ml-2 sm:ml-0 sm:px-4 sm:py-3 transition duration-500 ease-in-out text-white focus:outline-none h-full max-h-[25px] sm:max-h-[50px] border-0`} onClick={handleSendClick} disabled={isTyping || disabled}>
                        <span className="font-bold sm:block hidden sm:mr-2 mr-0">Send</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3 sm:h-6 sm:w-6 transform rotate-90">
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                        </svg>
                    </button>
                </div> */}
            </div>
        </div>
    )
}

export default Input;