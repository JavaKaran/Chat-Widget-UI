import React from 'react';
import ReactMarkdown from 'react-markdown';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import javascript from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import python from 'react-syntax-highlighter/dist/cjs/languages/prism/python';
import markdown from 'react-syntax-highlighter/dist/cjs/languages/prism/markdown';
import { oneDark, dracula, vscDarkPlus, oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';

SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('markdown', markdown);

const Message = ({ sender, text }) => {

  const textColor = sender === 'user' ? 'text-white' : 'text-gray-600';
  const bgColor = sender === 'user' ? 'bg-[#2c2d98]' : 'bg-gray-300';
  const roundedClass = sender === 'user' ? 'rounded-br-none' : 'rounded-bl-none';

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
        <code className={className} {...props} />
      )
    },
  }

  return (
    <div className="chat-message my-[5px] sm:my-2">
      <div className={`flex items-end ${sender === 'user' ? 'justify-end' : ''}`}>
        <div className={`flex flex-col  max-w-[80%] sm:max-w-[70%] mx-2 order-${sender === 'user' ? '1' : 'last'} items-${sender === 'user' ? 'end' : 'start'}`}>
          <div className={`py-2 px-3 rounded-xl w-full ${sender === 'user' && 'whitespace-pre-wrap'} break-words ${roundedClass} ${bgColor} ${textColor}`}>
            <ReactMarkdown
              components={MarkdownComponents}
              className='markdown-text'
            >
              {text}
            </ReactMarkdown>
          </div>
        </div>
        {sender !== "user" && <img src="../../App icon.png" alt="My profile" className="w-6 h-6 rounded-full order-first" />}
      </div>
    </div>
  );
};

export default Message;
