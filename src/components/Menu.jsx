import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ConversationPDF from "./ConversationPDF";
import { useState } from 'react';

const Menu = ({ showHeaderMenu, messages, downloadPDF, primaryColor, handleShowMenu }) => {

    const [selectedLanguage, setSelectedLanguage] = useState('English');
    const [showLanguage, setShowLanguage] = useState(false);

    const handleLanguages = () => {
        setShowLanguage(!showLanguage);
    }

    const handleLanguageChange = (language) => {
        setSelectedLanguage(language);
        setShowLanguage(!showLanguage);
    };

    const languages = [
        { id: 'english', name: 'English' },
        { id: 'spanish', name: 'Spanish' },
        { id: 'french', name: 'French' },
        { id: 'arabic', name: 'Arabic' },
        { id: 'russian', name: 'Russian' },
        { id: 'german', name: 'German' }
        // Add more language options here
      ];

    return (
        <>
        <div className={`bg-[rgba(0,0,0,0.7)] fixed z-10 flex justify-end flex-col h-full w-full ${showHeaderMenu ? 'show-menu' : 'hide-menu'}`} onClick={handleShowMenu}>
            
        </div>
        <div className={`menu-ct p-2 bg-white transition ease-in-out rounded-t-xl duration-500 z-30 shadow-md  w-full fixed left-[0px] bottom-0 ${showHeaderMenu ? 'show-menu' : 'hide-menu'}`}>
                {/* <p className="mb-2 text-[12px] leading-[12px] cursor-pointer" onClick={downloadPDF}>Share entire conversation (Image)</p>
                <PDFDownloadLink document={<ConversationPDF messages={messages} />} fileName="Chat.pdf" className="text-[12px] text-black no-underline cursor-pointer">
                    <p className="mb-2 text-[12px] leading-[12px]">Share entire conversation</p>
                </PDFDownloadLink>
                <p className="mb-1 text-[12px] leading-[12px]">Privacy Policy</p> */}

                <div className="menu-item flex items-center justify-start p-[8px] cursor-pointer" onClick={downloadPDF}>
                    <p className="mb-0 ml-0 text-[13px] leading-[16px] font-semibold" style={{ color: primaryColor }}>Share entire conversation (Image)</p>
                </div>
                <div className="menu-item flex items-center justify-start p-[8px] cursor-pointer">
                    <PDFDownloadLink document={<ConversationPDF messages={messages} />} fileName="Chat.pdf" className="text-[12px] text-black no-underline cursor-pointer">
                        <p className="mb-0 ml-0 text-[13px] leading-[16px] font-semibold" style={{ color: primaryColor }}>Share entire conversation</p>
                    </PDFDownloadLink>
                </div>
                <div className="menu-item flex items-center justify-start p-[8px] cursor-pointer">
                    <p className="mb-0 ml-0 text-[13px] leading-[16px] font-semibold" style={{ color: primaryColor }}>Privacy Policy</p>
                </div>
                <div className="menu-item flex items-center justify-between p-[8px] cursor-pointer">
                    <p className="mb-0 ml-0 text-[13px] leading-[16px] font-semibold" style={{ color: primaryColor }}>Select Language</p>
                    <div className='mr-[5px] flex items-center justify-center' onClick={handleLanguages}>
                        <p className={`px-2 rounded-2xl uppercase mb-0 text-[12px] leading-[10px]`} >{selectedLanguage}</p>
                        <img src="/assets/images/right-arrow-ic.svg" alt="right arrow" className="h-[12px]"/>
                    </div>
                </div>
                
        </div>
        <div className={`fixed top-0 w-full h-full z-20 ${showLanguage ? 'block' : 'hidden'}`}  onClick={handleLanguages}>
            <div className='bg-[rgba(0,0,0,0.7)] flex justify-end flex-col h-full w-full'>
                
            </div>
        </div>
        <div className={`language-ct rounded-t-xl bg-white p-3 pb-2 transition ease-in-out duration-500 divide-y divide-[#000000] w-full fixed bottom-0 left-0 z-50 ${showLanguage ? 'block' : 'hidden'}`}>
            <h2 className='font-semibold text-[15px] pb-[10px]'>Select Language</h2>
                <ul className='language-list list-none p-0 max-h-[140px] overflow-y-auto '>
                {languages.map((language) => (
                    <li className={`py-[10px] text-[13px] border-b border-gray-400 ${selectedLanguage == language.name ? 'text-[#912d2a]' : 'text-[#333333]'}`} key={language.id} onClick={() => handleLanguageChange(language.name)}>
                        {language.name}
                    </li>
                ))}
            </ul>
        </div>
        </>
       
    )
}

export default Menu;