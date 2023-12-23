import { BlobProvider, PDFDownloadLink } from "@react-pdf/renderer";
import React, { useEffect, useState } from "react";
import ChatPDF from "./ChatPDF";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { analytic } from "../utils/Analytics";

const MessageMenu = ({ showMessageMenu, handleMessageMenu, primary, setShowReport, showSources, setShowSources, handleSourceMenu, selectedMessage, getDateTime }) => {

    const { t } = useTranslation();

    const handleReport = () => {
        setShowReport(true);
    }

    const handleSources = () => {
        setShowSources(true);
    }

    const [dateInfo, setDateInfo] = useState('');

    useEffect(() => {
        setDateInfo(getDateTime());
    })

    const handlePDFDownload = () => {

        let data = {
            share_type: 'message'
        }

        analytic("share_event",data,null);

        toast(t('PDF Downloaded'),{
            duration: 1500,
            position: 'top-right',
            style: {
                backgroundColor: 'white',
                color: primary,
                fontSize: '13px',
                padding: '5px 7px',
                fontWeight: '500'
            }
        })
    }

    return (
        <>
            <div className={`bg-[rgba(0,0,0,0.7)] fixed bottom-0 flex justify-end flex-col h-full w-full ${showMessageMenu ? 'block' : 'hidden'}`} onClick={handleMessageMenu}>

            </div>
            <div className={`message-menu-ct rounded-t-xl bg-white p-2 py-1 transition ease-in-out duration-500 divide-y divide-[#000000] fixed left-[0px] bottom-0 w-full ${showMessageMenu ? 'show-msg-menu' : 'hide-msg-menu'}`} onClick={handleMessageMenu}>
                <div className="menu-item p-[10px] cursor-pointer">
                    <PDFDownloadLink document={<ChatPDF message={selectedMessage?.content} dateInfo={dateInfo} primary={primary} />} fileName="Message.pdf" className="text-[12px] text-black no-underline flex items-center justify-start cursor-pointer" onClick={handlePDFDownload}>
                        <div className="flex">
                            <svg width="14" height="14" viewBox="0 0 20 20" fill={primary} xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 14.08C14.24 14.08 13.56 14.38 13.04 14.85L5.91 10.7C5.96 10.47 6 10.24 6 10C6 9.76 5.96 9.53 5.91 9.3L12.96 5.19C13.5 5.69 14.21 6 15 6C16.66 6 18 4.66 18 3C18 1.34 16.66 0 15 0C13.34 0 12 1.34 12 3C12 3.24 12.04 3.47 12.09 3.7L5.04 7.81C4.5 7.31 3.79 7 3 7C1.34 7 0 8.34 0 10C0 11.66 1.34 13 3 13C3.79 13 4.5 12.69 5.04 12.19L12.16 16.35C12.11 16.56 12.08 16.78 12.08 17C12.08 18.61 13.39 19.92 15 19.92C16.61 19.92 17.92 18.61 17.92 17C17.92 15.39 16.61 14.08 15 14.08Z" />
                            </svg>
                        </div>
                        <p className="mb-0 ml-4 text-[13px] leading-[16px] font-medium" style={{ color: primary }}>{t('Share')}</p>
                    </PDFDownloadLink>
                    {/* <BlobProvider document={<ChatPDF message={message} dateInfo={dateInfo} />}>
                        {({ url, ...rest }) => {
                            return (
                                <a href={url} target="_blank" className="no-underline">
                                    <p className="mb-0 ml-4 text-[13px] leading-[16px] font-medium" style={{ color: primary }}>Share</p>
                                </a>
                            )
                        }}
                    </BlobProvider> */}

                </div>
                {/* <div className="menu-item flex items-center justify-start p-[10px] cursor-pointer" onClick={handleSources}>
                        <div className="flex">
                            <svg width="16" height="16" viewBox="0 0 20 20" fill={primary} xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 15.66H11V9.77996H9V15.66ZM10 7.81996C10.2833 7.81996 10.521 7.72588 10.713 7.53772C10.905 7.34956 11.0007 7.11697 11 6.83996C11 6.56229 10.904 6.32938 10.712 6.14122C10.52 5.95306 10.2827 5.85931 10 5.85996C9.71667 5.85996 9.479 5.95404 9.287 6.1422C9.095 6.33036 8.99933 6.56295 9 6.83996C9 7.11763 9.096 7.35054 9.288 7.5387C9.48 7.72686 9.71733 7.82061 10 7.81996ZM10 20.56C8.61667 20.56 7.31667 20.3025 6.1 19.7877C4.88333 19.2729 3.825 18.5748 2.925 17.6935C2.025 16.8115 1.31267 15.7743 0.788 14.582C0.263333 13.3896 0.000666667 12.1156 0 10.76C0 9.40429 0.262667 8.13029 0.788 6.93796C1.31333 5.74563 2.02567 4.70846 2.925 3.82646C3.825 2.94446 4.88333 2.24637 6.1 1.7322C7.31667 1.21803 8.61667 0.960614 10 0.959961C11.3833 0.959961 12.6833 1.21737 13.9 1.7322C15.1167 2.24703 16.175 2.94511 17.075 3.82646C17.975 4.70846 18.6877 5.74563 19.213 6.93796C19.7383 8.13029 20.0007 9.40429 20 10.76C20 12.1156 19.7373 13.3896 19.212 14.582C18.6867 15.7743 17.9743 16.8115 17.075 17.6935C16.175 18.5755 15.1167 19.2739 13.9 19.7887C12.6833 20.3035 11.3833 20.5606 10 20.56ZM10 18.6C12.2333 18.6 14.125 17.8405 15.675 16.3215C17.225 14.8025 18 12.9486 18 10.76C18 8.57129 17.225 6.71746 15.675 5.19846C14.125 3.67946 12.2333 2.91996 10 2.91996C7.76667 2.91996 5.875 3.67946 4.325 5.19846C2.775 6.71746 2 8.57129 2 10.76C2 12.9486 2.775 14.8025 4.325 16.3215C5.875 17.8405 7.76667 18.6 10 18.6Z" />
                            </svg>

                        </div>
                        <p className="mb-0 ml-4 text-[13px] leading-[16px] font-medium" style={{ color: primary }}>View Sources</p>
                    </div> */}
                <div className="menu-item flex items-center justify-start p-[10px] cursor-pointer" onClick={handleReport}>
                    <div className="flex">
                        <svg width="14" height="14" viewBox="0 0 15 17" fill={primary} xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 17V0H9L9.4 2H15V12H8L7.6 10H2V17H0ZM9.65 10H13V4H7.75L7.35 2H2V8H9.25L9.65 10Z" />
                        </svg>
                    </div>
                    <p className="mb-0 ml-4 text-[13px] leading-[16px] font-medium" style={{ color: primary }}>{t('Report Message')}</p>
                </div>
            </div>
        </>
    )
}

export default MessageMenu;