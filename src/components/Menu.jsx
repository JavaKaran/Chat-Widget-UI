import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ConversationPDF from "./ConversationPDF";

const Menu = ({ showHeaderMenu, messages, downloadPDF }) => {
    return (
        <div className={`p-2 bg-white transition ease-in-out rounded-md duration-500 z-30 shadow-md absolute right-[10px] ${showHeaderMenu ? 'show-menu' : 'hide-menu'}`}>
            <p className="mb-2 text-[12px] leading-[12px]" onClick={downloadPDF}>Share entire conversation (Image)</p>
            <PDFDownloadLink document={<ConversationPDF messages={messages} />} fileName="Chat.pdf" className="text-[12px] text-black no-underline">
                <p className="mb-2 text-[12px] leading-[12px]">Share entire conversation</p>
            </PDFDownloadLink>
            <p className="mb-1 text-[12px] leading-[12px]">Privacy Policy</p>
        </div>
    )
}

export default Menu;