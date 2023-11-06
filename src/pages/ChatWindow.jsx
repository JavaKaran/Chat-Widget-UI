import React, { useState, useEffect, useRef } from 'react';
import Message from '../components/Message.jsx';
import Typing from '../components/TypingIndicator.jsx';
import Header from '../components/Header.jsx';
import Input from '../components/Input.jsx';
import axios from 'axios';
import Report from '../Report.jsx';
import Menu from '../components/Menu.jsx';
import MessageMenu from '../components/MessageMenu.jsx';
import Sources from '../components/Sources.jsx';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import PDFGenerator from '../components/ConversationPDF.jsx';
import html2pdf from 'html2pdf.js/dist/html2pdf.min';

const ChatWindow = ({ iframeDomain, botApiId }) => {

  let site = window.location.origin;
  let assetUrl = process.env.REACT_APP_ASSETS_URL;
  const apiURL = process.env.REACT_APP_API_URL;

  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [domain, setDomain] = useState(iframeDomain);
  const [botId, setBotId] = useState(botApiId);
  const [bot, setBot] = useState({
    name: '',
    description: "",
    image: `${site}/background.png`,
    primaryColor: '#912d2a'
  });
  const [disabled, setDisabled] = useState(true);
  const [noWelcomeMessage, setNoWelcomeMessage] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [showHeaderMenu, setShowHeaderMenu] = useState(false);
  const [showMessageMenu, setShowMessageMenu] = useState(false);

  const [showSources, setShowSources] = useState(false);

  const textAreaRef = useRef();
  const messageListRef = useRef();

  const handleMessageSend = (text) => {
    if (isTyping) return;
    setIsTyping(true);
    setMessages((prevMessage) => [...prevMessage, { sender: 'user', text }]);
    sendMessage(text);
  };

  const scrollToEnd = () => {
    const messageList = messageListRef.current;
    messageList.scrollTop = messageList.scrollHeight;
  }

  useEffect(() => {
    scrollToEnd();
  }, [messages]);

  useEffect(() => {
    axios({
      url: `${apiURL}/bot_by_id/bot_${botId}`,
      method: 'POST',
      data: {
        domain: domain
      },
      headers: {
        'Api-token': 'BLiEUe64EC4Wj7HPYPXa'
      }
    })
      .then((response) => {
        // console.log(response);
        if (response.status === 200 && response.data.data.length > 0) {
          let bot = response?.data?.data[0]?.attributes;
          let botImage = bot?.ProfileImage?.data?.attributes?.url;
          setBot({
            name: bot.Name ? bot.Name : "Brainstormer",
            description: bot.Description ? bot.Description : "Let's Brainstorm the future!",
            image: botImage ? `${assetUrl}${botImage}` : `${site}/App-icon.png`,
            primaryColor: '#912d2a'
          })
          setDisabled(false);
          { bot.WelcomeMessage ? setMessages((prevMessage) => [...prevMessage, { sender: 'bot', text: bot.WelcomeMessage }]) : setNoWelcomeMessage(true) }
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  useEffect(() => {
    if (noWelcomeMessage) {
      setMessages((prevMessage) => [...prevMessage, { sender: 'bot', text: 'Welcome my master. Your message is my command!' }]);
      setNoWelcomeMessage(false);
    }
  }, [noWelcomeMessage])

  const sendMessage = (text) => {
    axios({
      url: `${apiURL}/widget_handler`,
      method: 'POST',
      data: {
        "query": text ? text : 'hi, who are you and how can you help me?',
        "bot_id": `bot_${botId}`,
      },
      headers: {
        'Api-token': 'BLiEUe64EC4Wj7HPYPXa'
      }
    })
      .then((response) => {
        if (response.data.status === 'success') {
          setMessages((prevMessage) => [...prevMessage, { sender: 'bot', text: response.data.message }]);
          setIsTyping(false);
          setNoWelcomeMessage(false);
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const handleShowMenu = () => {
    setShowHeaderMenu(!showHeaderMenu);
  }

  const handleMessageMenu = () => {
    setShowMessageMenu(!showMessageMenu);
  }

  const handleSourceMenu = () => {
    setShowSources(!showSources);
  }

  const downloadPDF = async () => {
    // // const messages = document.getElementById("message-list");
    // const messages = document.getElementById("messages-list-inside");
    // // const canvas = await html2canvas(messages,{ width: messages.scrollWidth, height: messages.scrollHeight})
    // const canvas = await html2canvas(messages,{ windowWidth: 1450, windowHeight: 630 })
    // // const canvas = await html2canvas(messages)
    // const data = canvas.toDataURL('image/png');

    // const pdf = new jsPDF();
    // const imgProperties = pdf.getImageProperties(data);
    // const pdfWidth = pdf.internal.pageSize.getWidth();
    // const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    // pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
    // pdf.save('print.pdf');

    const messages = document.getElementById("messages-list-inside");
    const pdfWidth = 210; // PDF page width in mm (A4 size)
    const pdfHeight = 297; // PDF page height in mm (A4 size)

    const options = {
      margin: 5,
      filename: 'print.pdf',
      image: { type: 'jpg', quality: 1.0 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: [pdfWidth, pdfHeight], orientation: 'portrait' },
    };

    const pdfDoc = html2pdf()
      .set(options)
      .from(messages)
      .save();

    pdfDoc.then(() => {
      console.log('PDF generated successfully.');
    });

  }

  return (
    <div className="flex-1 justify-between flex flex-col h-screen relative">
      <Header bot={bot} handleShowMenu={handleShowMenu} />
      <Menu showHeaderMenu={showHeaderMenu} messages={messages} downloadPDF={downloadPDF} primaryColor={bot.primaryColor} handleShowMenu={handleShowMenu}/>
      <div id="message-list" ref={messageListRef} className="flex flex-col h-full pl-[10px] pr-0 py-3 sm:p-6 overflow-y-auto">
        <div id="messages-list-inside" className='w-auto h-auto'>
          {messages.map((message, index) => (
            <Message
              key={index}
              sender={message.sender}
              text={message.text}
              image={bot.image}
              primaryColor={bot.primaryColor}
              setShowReport={setShowReport}
              handleMessageMenu={handleMessageMenu}
            />
          ))}
          {isTyping && <Typing image={bot.image} primaryColor={bot.primaryColor} />}
        </div>
      </div>
      <Input textAreaRef={textAreaRef} handleMessageSend={handleMessageSend} isTyping={isTyping} setIsTyping={setIsTyping} disabled={disabled} primaryColor={bot.primaryColor} handleShowMenu={handleShowMenu} />
      {showReport && <Report setShowReport={setShowReport} primaryColor={bot.primaryColor} />}
      <MessageMenu showMessageMenu={showMessageMenu} handleMessageMenu={handleMessageMenu} primaryColor={bot.primaryColor} setShowReport={setShowReport} showSources={showSources} setShowSources={setShowSources} handleSourceMenu={handleSourceMenu} />
      <Sources showSources={showSources} setShowSources={setShowSources} handleSourceMenu={handleSourceMenu} />
      {/* <PDFGenerator messages={messages} /> */}
    </div>
  );
}

export default ChatWindow;
