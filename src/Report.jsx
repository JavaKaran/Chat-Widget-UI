import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import toast from 'react-hot-toast';

const Report = ({ primary, setShowReport, selectedMessage, fadeEffect, messages }) => {

    const apiURL = process.env.REACT_APP_API_URL;
    const apiKey = process.env.REACT_APP_BOT_API_KEY;

    const { t } = useTranslation();

    const [selectedOption, setSelectedOption] = useState('Hateful');
    const [otherText, setOtherText] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [reporting, setReporting] = useState(false);

    const handleReport = async (reason) => {
        const messageToReport = messages.findIndex((msg) => msg.content === selectedMessage.content);

        const chat_id = localStorage.getItem('chatId');

        let requestData = {
            "message_index": messageToReport,
            "is_flagged": `1`,
            "reason": reason
        }

        if (chat_id) {
            requestData.chat_id = chat_id
        }

        setReporting(true);

        await axios({
            url: `${apiURL}/flag_message`,
            method: 'POST',
            data: requestData,
            headers: {
                'Api-token': apiKey
            }
        })
            .then((response) => {
                if (response.data.status === 'success') {
                    messages[messageToReport]['is_flagged'] = 1;
                    messages[messageToReport]['reason'] = reason;

                    setSubmitted(true);
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

        setReporting(false);
    }


    const handleRadioChange = (e) => {
        setSelectedOption(e.target.value);
    }

    const handleTextChange = (e) => {
        setOtherText(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleReport(selectedOption !== 'Other' ? selectedOption : otherText);
    }

    const handleBack = () => {
        setShowReport(false)
        setSubmitted(false);
    }

    return (
        <div className={`fixed bottom-0 w-full h-full overflow-y-auto bg-[${primary}] `}>
            <div className="flex p-3 h-[8vh] cursor-pointer">
                <img src="/assets/images/back-icon.svg" width={16} height={16} alt="Back" onClick={handleBack} className="ml-[10px]" />
            </div>
            <div className="w-full md:w-1/2 mx-auto bg-white !p-[20px] border rounded-t-2xl min-h-[100vh]">
                {!submitted ? (
                    <div className={`flex justify-between items-start flex-col h-[75vh] ${fadeEffect}`}>
                        <div>
                            <div className="bg-[#f5f5f5] p-[15px] rounded-xl mt-[10px] mb-[20px]">
                                <p className="text-[#333] text-[12px] leading-[18px] mb-0 max-3-lines">{selectedMessage.content}</p>
                            </div>
                            <h4 className="font-normal text-[#333333] text-[16px] font-semibold leading-[22px] mb-[15px]">{t('Why do you want to report this message?')}</h4>
                            <form>
                                <div className="radio my-[4px]">
                                    <label className="flex items-center text-[14px] leading-[16px]">
                                        <input
                                            type="radio"
                                            value="Hateful"
                                            checked={selectedOption === "Hateful"}
                                            onChange={handleRadioChange}
                                            className={`my-2 w-5 h-4`}
                                            style={{ accentColor: primary }}
                                        />
                                        <span className="ml-2 text-[13px] text-[#333333] font-semibold">{t('Hateful')}</span>
                                    </label>
                                </div>
                                <div className="radio my-[4px]">
                                    <label className="flex items-center text-[14px] leading-[16px]">
                                        <input
                                            type="radio"
                                            value="Abusive and Harassment"
                                            checked={selectedOption === "Abusive and Harassment"}
                                            onChange={handleRadioChange}
                                            className={`my-2 w-5 h-4`}
                                            style={{ accentColor: primary }}
                                        />
                                        <span className="ml-2 text-[13px] text-[#333333] font-semibold">{t('Abusive and Harassment')}</span>
                                    </label>
                                </div>
                                <div className="radio my-[4px]">
                                    <label className="flex items-center text-[14px] leading-[16px]">
                                        <input
                                            type="radio"
                                            value="Spam"
                                            checked={selectedOption === "Spam"}
                                            onChange={handleRadioChange}
                                            className={`my-2 w-5 h-4`}
                                            style={{ accentColor: primary }}
                                        />
                                        <span className="ml-2 text-[13px] text-[#333333] font-semibold">{t('Spam')}</span>
                                    </label>
                                </div>
                                <div className="radio my-[4px]">
                                    <label className="flex items-center text-[14px] leading-[16px]">
                                        <input
                                            type="radio"
                                            value="Other"
                                            checked={selectedOption === "Other"}
                                            onChange={handleRadioChange}
                                            className={`my-2 w-5 h-4`}
                                            style={{ accentColor: primary }}
                                        />
                                        <span className="ml-2 text-[13px] text-[#333333] font-semibold">{t('Other')}</span>
                                    </label>
                                </div>
                                {selectedOption == 'Other' && <textarea value={otherText} onChange={handleTextChange} rows={5} placeholder={t('Not Appropriate For Children')} className="resize-none w-full md:w-[50%] my-2 p-2 text-[14px] leading-[14px] border bg-[#FCFCFC]" />}
                            </form>
                        </div>
                        <button className="block bg-[#f3a01a] w-full text-center text-white border-none py-3 text-[16px] font-semibold leading-[12px] mt-2 disabled:opacity-50 disabled:cursor-not-allowed" type="submit" onClick={handleSubmit} disabled={reporting}>
                            {!reporting ? t('Submit') : t('Submitting...')}
                        </button>
                    </div>
                ) : (
                    <div className={`flex items-center justify-center flex-col h-[75vh] fadeIn`}>
                        <img src="/assets/images/submitted-img.svg" width={80} height={80} alt="Submitted Icon" />
                        <p className="text-[20px] leading-[32px] text-center font-bold mt-[20px]">{t('Your report has been submitted')}.</p>
                        <p className="text-[16px] leading-[28px] text-center text-[#333] font-semibold px-[15px]">{t('Thanks for your feedback, our team will look into it!')}</p>
                        <button className="w-[40%] py-[10px] bg-[#f3a01a] text-white mt-[30px] border-none" onClick={handleBack}>{t('OK')}</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Report;