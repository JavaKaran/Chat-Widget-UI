import React from "react";
import { BlobProvider, PDFDownloadLink } from "@react-pdf/renderer";
import ConversationPDF from "./ConversationPDF";
import { useEffect, useState } from 'react';
import toast from "react-hot-toast";

const Menu = ({ showHeaderMenu, messages, downloadPDF, primaryColor, handleShowMenu, bot, getDateTime }) => {

    const [selectedLanguage, setSelectedLanguage] = useState('English');
    const [showLanguage, setShowLanguage] = useState(false);

    const handleLanguages = () => {
        setShowLanguage(!showLanguage);
    }

    const handleLanguageChange = (language) => {
        setSelectedLanguage(language);
        setShowLanguage(!showLanguage);
        toast('Language changed',{
            duration: 1500,
            position: 'top-right',
            style: {
                backgroundColor: 'white',
                color: primaryColor,
                fontSize: '12px',
                padding: '5px 7px'
            }
        })
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

    const [dateInfo, setDateInfo] = useState('');

    useEffect(() => {
        setDateInfo(getDateTime());
    })

    const handlePDFDownload = () => {
        handleShowMenu();
        toast('PDF Downloaded',{
            duration: 1500,
            position: 'top-right',
            style: {
                backgroundColor: 'white',
                color: primaryColor,
                fontSize: '12px',
                padding: '5px 7px'
            }
        })
    }

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

                {/* <div className="menu-item flex items-center justify-start p-[8px] cursor-pointer" onClick={downloadPDF}>
                    <p className="mb-0 ml-0 text-[13px] leading-[16px] font-normal" style={{ color: primaryColor }}>Share entire conversation (Image)</p>
                </div> */}
                <div className="menu-item flex items-center justify-start p-[10px] cursor-pointer">
                    <PDFDownloadLink document={<ConversationPDF messages={messages} bot={bot} dateInfo={dateInfo} />} fileName="Chat.pdf" className="text-[12px] text-black no-underline cursor-pointer" onClick={handlePDFDownload}>
                        <p className="mb-0 ml-0 text-[13px] leading-[16px] font-medium" style={{ color: primaryColor }}>Share entire conversation</p>
                    </PDFDownloadLink>
                    {/* <BlobProvider document={<ConversationPDF messages={messages} bot={bot} dateInfo={dateInfo} />}>
                        {({ url, ...rest }) => {
                            return (
                                <a href={url} target="_blank" className="no-underline">
                                    <p className="mb-0 ml-0 text-[13px] leading-[16px] font-medium" style={{ color: primaryColor }}>Share entire conversation</p>
                                </a>
                            )
                        }}
                    </BlobProvider> */}
                </div>
                <div className="menu-item flex items-center justify-start p-[10px] cursor-pointer">
                    <p className="mb-0 ml-0 text-[13px] leading-[16px] font-medium" style={{ color: primaryColor }}>Privacy Policy</p>
                </div>
                <div className="menu-item flex items-center justify-between p-[10px] cursor-pointer">
                    <p className="mb-0 ml-0 text-[13px] leading-[16px] font-medium" style={{ color: primaryColor }}>Select Language</p>
                    <div className='mr-[0px] flex items-center justify-center' onClick={handleLanguages}>
                        <p className={`px-2 rounded-2xl uppercase mb-0 text-[12px] leading-[12px] pb-[2px]`} >{selectedLanguage}</p>
                        <img src="/assets/images/right-arrow-ic.svg" alt="right arrow" className="h-[10px]"/>
                    </div>
                </div>
                
        </div>
        <div className={`fixed top-0 w-full h-full z-20 ${showLanguage ? 'block' : 'hidden'}`}  onClick={handleLanguages}>
            <div className='bg-[rgba(0,0,0,0.7)] flex justify-end flex-col h-full w-full'>
                
            </div>
        </div>
        <div className={`language-ct rounded-t-xl bg-white p-3 pb-2 transition ease-in-out duration-500 divide-y divide-[#000000] w-full fixed bottom-0 left-0 z-50 ${showLanguage ? 'show-lang-menu' : 'hide-lang-menu'}`}>
                <div className="flex justify-start items-center pb-[10px]">
                    <a className="cursor-pointer" onClick={handleLanguages}>
                        <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 7H3.83L9.42 1.41L8 0L0 8L8 16L9.41 14.59L3.83 9H16V7Z" fill="#333333"/>
                        </svg>
                    </a>
                    <h2 className='font-semibold text-[15px] pb-[2px] ml-[15px]'>Select Language</h2>
                </div>
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