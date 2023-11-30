import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import javascript from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import python from 'react-syntax-highlighter/dist/cjs/languages/prism/python';
import markdown from 'react-syntax-highlighter/dist/cjs/languages/prism/markdown';
import { oneDark, dracula, vscDarkPlus, oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { useTranslation } from 'react-i18next';

SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('markdown', markdown);

const Message = ({ message, image, primary, setShowReport, handleMessageMenu }) => {

  const { t } = useTranslation();

  let citations = [
    {
      start: 2,
      end: 8,
      document_ids: [
        "web-search_1",
        "web-search_8"
      ]
    },
    {
      start: 10,
      end: 12,
      document_ids: [
        "web-search_1"
      ]
    },
    {
      start: 15,
      end: 22,
      document_ids: [
        "web-search_1",
        "web-search_8"
      ]
    }
  ];

  const [openSources, setOpenSources] = useState(false);

  const handleSources = () => {
    setOpenSources(!openSources)
  }

  const handleReportBtn = () => {
    setShowReport(true);
  }

  const textColor = message.role === 'user' ? 'text-white' : 'text-gray-600';
  const bgColor = message.role === 'user' ? `bg-[${primary}]` : 'bg-[#f5f5f5] border border-[#f5f5f5]';
  const roundedClass = message.role === 'user' ? 'rounded-br-none' : 'rounded-bl-none';

  const syntaxTheme = oneDark;

  const MarkdownComponents = {
    code({ node, inline, className, children, ...props }) {
      const hasLang = /language-(\w+)/.exec(className || '');

      return hasLang ? (
        <SyntaxHighlighter
          style={syntaxTheme}
          language={hasLang[1]}
          PreTag="div"
          className="codeStyle"
          showLineNumbers={true}
          useInlineStyles={true}
          children={children}
        />
      ) : (
        <code className={className} {...props} children={children} />
      )
    },
    a({ node, ...props }) {
      return <a target="_blank" {...props} />;
    },
    table({ node, ...props }) {
      return (
        <div className='table-responsive'>
          <table className="table table-bordered" {...props} />
        </div>
      );
    }
  }

  // function generateMarkdownWithHighlights(text) {
  //   console.log("text",text);
  //   const highlightedText = `<span class="hi">${text}</span>`;

  //   return text;
  // }

  return (
    <div className="chat-message my-[10px] sm:my-2">
      <div className={`flex items-start ${message.role === 'user' ? 'justify-end' : ''}`}>
        <div className={`flex flex-col max-w-[75%] sm:max-w-[70%] ${message.role === 'user' && 'mr-0'} mx-2 order-${message.role === 'user' ? '1' : 'last'} items-${message.role === 'user' ? 'end' : 'start rounded-xl rounded-bl-none'}`}>
          <div className={`py-2 px-3 rounded-xl w-full ${message.role === 'user' && 'whitespace-pre-wrap'} break-words ${roundedClass} ${bgColor} ${textColor} ${message.role} ${message.reported ? 'opacity-50' : ''}`}>
            <ReactMarkdown
              components={MarkdownComponents}
              className='markdown-text'
              remarkPlugins={[remarkGfm]}
            >
              {message.content}
            </ReactMarkdown>
            {message.role !== 'user' && (<button className='w-full flex pt-2 justify-end cursor-pointer disabled:cursor-not-allowed border-none bg-transparent' onClick={(e) => handleMessageMenu(e,message)} disabled={message.reported} >
              <svg width="16" height="6" viewBox="0 0 17 3" fill={primary} xmlns="http://www.w3.org/2000/svg">
                <circle cx="1.5" cy="1.5" r="1.5" />
                <circle cx="8.5" cy="1.5" r="1.5" />
                <circle cx="15.5" cy="1.5" r="1.5" />
              </svg>
            </button>)}
          </div>
          {message.reported && <p className='text-[12px] leading-[12px] my-1 text-red-500'>{t('This message has been reported!')}</p>}
          {/* {message.role !== 'user' && (
            <div className={`flex flex-col py-2 w-full`}>
              <div className='flex justify-between items-center w-full'>
                <div className='flex ml-2'>
                  <p className='text-[12px] leading-[12px] mb-0'>Sources</p>
                  <div className='flex' onClick={handleSources}>
                    <img className={`ml-2 cursor-pointer ${openSources && 'rotate180 mr-2 ml-0'}`} src='/assets/images/dropdown-icon.svg' width={12} height={12} />
                  </div>
                </div>
                <div className='flex items-start self-stretch'>
                  <div className='cursor-pointer mx-2 flex' onClick={handleReportBtn}>
                    <img src='/assets/images/flag-icon.svg' width={18} height={18} alt='Flag' />
                  </div>
                  <div className='cursor-pointer mx-2 flex'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 -960 960 960" width="18" className={`fill-[${primaryColor}]`}>
                      <path d="M720-80q-50 0-85-35t-35-85q0-7 1-14.5t3-13.5L322-392q-17 15-38 23.5t-44 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q23 0 44 8.5t38 23.5l282-164q-2-6-3-13.5t-1-14.5q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-23 0-44-8.5T638-672L356-508q2 6 3 13.5t1 14.5q0 7-1 14.5t-3 13.5l282 164q17-15 38-23.5t44-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-640q17 0 28.5-11.5T760-760q0-17-11.5-28.5T720-800q-17 0-28.5 11.5T680-760q0 17 11.5 28.5T720-720ZM240-440q17 0 28.5-11.5T280-480q0-17-11.5-28.5T240-520q-17 0-28.5 11.5T200-480q0 17 11.5 28.5T240-440Zm480 280q17 0 28.5-11.5T760-200q0-17-11.5-28.5T720-240q-17 0-28.5 11.5T680-200q0 17 11.5 28.5T720-160Zm0-600ZM240-480Zm480 280Z" />
                    </svg>
                  </div>
                </div>
              </div>
              {openSources && (<div className='mt-2 ml-2'>
                <p className='text-[12px] leading-[12px] underline'>FinancialReport2023</p>
              </div>)}
            </div>
          )} */}
        </div>
        {message.role !== "user" && <img src={image} alt="My profile" className="w-7 h-7 rounded-full order-first" />}
      </div>
    </div>
  );
};

export default Message;
