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
import toast, { Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useToaster } from 'react-hot-toast';
import { analytic } from '../utils/Analytics.js';
import PromptsSuggestion from '../components/PromptsSuggestion.jsx';

const ChatWindow = ({ iframeDomain, botApiId, primaryColor }) => {

  const { t, i18n } = useTranslation();

  let site = window.location.origin;
  let assetUrl = process.env.REACT_APP_ASSETS_URL;
  const apiURL = process.env.REACT_APP_API_URL;
  const apiKey = process.env.REACT_APP_BOT_API_KEY;

  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [domain, setDomain] = useState(iframeDomain);
  const [botId, setBotId] = useState(botApiId);
  const [bot, setBot] = useState({
    name: '',
    description: "",
    image: `${site}/background.png`
  });
  const [primary, setPrimary] = useState(primaryColor);
  const [disabled, setDisabled] = useState(true);
  const [noWelcomeMessage, setNoWelcomeMessage] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [showHeaderMenu, setShowHeaderMenu] = useState(false);
  const [showMessageMenu, setShowMessageMenu] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const languages = [
    { id: 'english', name: 'English', value: 'en' },
    { id: 'spanish', name: 'Spanish', value: 'es' },
    { id: 'french', name: 'French', value: 'fr' },
    { id: 'arabic', name: 'Arabic', value: 'ar' },
    { id: 'russian', name: 'Russian', value: 'ru' },
    { id: 'german', name: 'German', value: 'de' }
  ];

  const [showSources, setShowSources] = useState(false);
  const [showPrompts, setShowPrompts] = useState(false);

  const textAreaRef = useRef();
  const messageListRef = useRef();
  const didMount = useRef(false);
  let langToast;

  const handleMessageSend = (text) => {
    if (isTyping) return;
    setIsTyping(true);
    setMessages((prevMessage) => [...prevMessage, { role: 'user', content: text, is_flagged: 0, reason: '' }]);
    sendMessage(text);

    let data = {
      bot_name: bot.name
    }

    analytic("send_message", data, null);
  };

  const scrollToEnd = () => {
    const messageList = messageListRef.current;
    messageList.scrollTop = messageList.scrollHeight;
  }

  useEffect(() => {
    scrollToEnd();
  }, [messages]);

  const fetchInfo = () => {
    let chat_id = localStorage.getItem('chatId');

    let requestData = {
      domain: domain
    }

    if(chat_id){
      requestData.chat_id = chat_id
    }

    axios({
      url: `${apiURL}/bot_by_id/bot_${botId}`,
      method: 'POST',
      data: requestData,
      headers: {
        'Api-token': apiKey
      }
    })
      .then((response) => {
        // console.log(response);
        if (response.status === 200 && response.data.data.length > 0) {
          let bot = response?.data?.data[0]?.attributes;
          let botImage = bot?.ProfileImage?.data?.attributes?.url;

          if (i18n.language === 'en') {

            setBot({
              name: bot.Name ? bot.Name : "Brainstormer",
              description: bot.Description ? bot.Description : "Let's Brainstorm the future!",
              image: botImage ? `${assetUrl}${botImage}` : `${site}/App-icon.png`
            })

          } else {

            let localizedData = bot?.localizations?.data?.find((lng) => lng?.attributes?.locale === i18n.language);

            setBot({
              name: localizedData?.attributes?.Name ? localizedData?.attributes?.Name : bot.Name,
              description: localizedData?.attributes?.Description ? localizedData?.attributes?.Description : bot.Description,
              image: botImage ? `${assetUrl}${botImage}` : `${site}/App-icon.png`
            })
          }

          setDisabled(false);

          if(response.data.chat){
            setMessages([...response.data.chat.chat_history]);
          } else {
            if (messages.length === 0) {
              bot.WelcomeMessage ? setMessages((prevMessage) => [...prevMessage, { role: 'assistant', content: bot.WelcomeMessage, is_flagged: 0, reason: '' }]) : setNoWelcomeMessage(true)
            }
          }

          // toast.dismiss(langToast);
          if (didMount.current) {
            toast.success(t('Language changed'), {
              id: 'language',
              position: 'top-right',
              style: {
                backgroundColor: 'white',
                color: primary,
                fontSize: '13px',
                padding: '5px 7px',
                fontWeight: '500'
              }
            })

          } else {
            didMount.current = true;
          }

          if(response?.data?.chat_id){
            localStorage.setItem('chatId', response?.data?.chat_id)
          }


        }
      })
      .catch((err) => {
        console.log(err);
        toast.error('Something broke! Please try later.', {
          position: 'top-right',
          style: {
            backgroundColor: 'white',
            color: primary,
            fontSize: '13px',
            padding: '5px 7px',
            fontWeight: '500'
          }
        })
      })
  }

  useEffect(() => {

    let data = {
      parent_domain: domain
    }

    analytic("app_invokation", data, null);

    fetchInfo();

  }, []);

  useEffect(() => {
    if (noWelcomeMessage) {
      setMessages((prevMessage) => [...prevMessage, { role: 'assistant', content: 'Welcome my master. Your message is my command!', is_flagged: 0, reason: '' }]);
      setNoWelcomeMessage(false);
    }
  }, [noWelcomeMessage])

  const sendMessage = (text) => {

    const language = languages.find((lng) => lng.value === i18n.language);

    const chat_id = localStorage.getItem('chatId');

    let requestData = {
      "query": text ? text : 'hi, who are you and how can you help me?',
      "bot_id": `bot_${botId}`,
      "language": language.name
    }

    if(chat_id){
      requestData.chat_id = chat_id
    }

    axios({
      url: `${apiURL}/widget_handler`,
      method: 'POST',
      data: requestData,
      headers: {
        'Api-token': apiKey
      }
    })
      .then((response) => {
        if (response.data.status === 'success') {
          setMessages((prevMessage) => [...prevMessage, { role: 'assistant', content: response.data.message, is_flagged: 0, reason: '' }]);
          setIsTyping(false);
          setNoWelcomeMessage(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsTyping(false);
        setNoWelcomeMessage(false);
        toast.error('Something broke! Please try later.', {
          position: 'top-right',
          style: {
            backgroundColor: 'white',
            color: primary,
            fontSize: '13px',
            padding: '5px 7px',
            fontWeight: '500'
          }
        })
      })
  }

  const handleShowMenu = () => {
    setShowHeaderMenu(!showHeaderMenu);
  }

  const handleMessageMenu = (e, message) => {
    setShowMessageMenu(!showMessageMenu);
    if (message) {
      setSelectedMessage(message);
    }
  }

  const handleSourceMenu = () => {
    setShowSources(!showSources);
  }

  const handlePromptsMenu = () => {
    setShowPrompts(!showPrompts);
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

  const getDateTime = () => {
    const currentDateTime = new Date();

    const options = {
      hour: '2-digit',
      minute: '2-digit',
    };

    const time = currentDateTime.toLocaleTimeString('en-US', options);
    const day = currentDateTime.getDate();
    const month = currentDateTime.toLocaleString('en-US', { month: 'long' });
    const year = currentDateTime.getFullYear();

    return `${time} , ${day}${getDaySuffix(day)} ${month} ${year}`;
  }

  const getDaySuffix = (day) => {
    if (day >= 11 && day <= 13) {
      return 'th';
    }
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }

  const handlePromptClick = (text) => {
    handlePromptsMenu();
    handleMessageSend(text);
  }

  return (
    <div className="flex-1 justify-between flex flex-col h-screen relative">
      <Header bot={bot} handleShowMenu={handleShowMenu} primary={primary} />
      <Menu bot={bot} showHeaderMenu={showHeaderMenu} messages={messages} downloadPDF={downloadPDF} primary={primary} handleShowMenu={handleShowMenu} getDateTime={getDateTime} languages={languages} langToast={langToast} fetchInfo={fetchInfo} />
      <div id="message-list" ref={messageListRef} className="flex flex-col h-full px-[10px] py-3 sm:p-6 overflow-y-auto">
        <div id="messages-list-inside" className='w-auto h-auto'>
          {messages.map((message, index) => (
            <Message
              key={index}
              message={message}
              image={bot.image}
              primary={primary}
              setShowReport={setShowReport}
              handleMessageMenu={handleMessageMenu}
            />
          ))}
          {isTyping && <Typing image={bot.image} primary={primary} />}
        </div>
      </div>
      <PromptsSuggestion showPrompts={showPrompts} handlePromptsMenu={handlePromptsMenu} handlePromptClick={handlePromptClick} />
      <Input textAreaRef={textAreaRef} handleMessageSend={handleMessageSend} isTyping={isTyping} setIsTyping={setIsTyping} disabled={disabled} primary={primary} handleShowMenu={handleShowMenu} handlePromptsMenu={handlePromptsMenu} />
      {showReport && <Report setShowReport={setShowReport} primary={primary} fadeEffect={'zoomIn'} selectedMessage={selectedMessage} messages={messages} />}
      <MessageMenu showMessageMenu={showMessageMenu} handleMessageMenu={handleMessageMenu} primary={primary} setShowReport={setShowReport} showSources={showSources} setShowSources={setShowSources} handleSourceMenu={handleSourceMenu} selectedMessage={selectedMessage} getDateTime={getDateTime} />
      <Sources showSources={showSources} setShowSources={setShowSources} handleSourceMenu={handleSourceMenu} />
      {/* <PDFGenerator messages={messages} /> */}
      <Toaster />
    </div>
  );
}

export default ChatWindow;
