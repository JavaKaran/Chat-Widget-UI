import React, { useState } from "react";

const Report = ({ primaryColor, setShowReport, text, fadeEffect }) => {

    const [selectedOption, setSelectedOption] = useState('Hateful');
    const [otherText, setOtherText] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleRadioChange = (e) => {
        setSelectedOption(e.target.value);
    }

    const handleTextChange = (e) => {
        setOtherText(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("form submitted");
        setSubmitted(true);
    }

    const handleBack = () => {
        setShowReport(false)
    }

    return (
        <div className={`fixed bottom-0 w-full h-full overflow-y-auto bg-[${primaryColor}] `}>
            <div className="flex p-3 h-[8vh] cursor-pointer">
                <img src="/assets/images/back-icon.svg" width={16} height={16} alt="Back" onClick={handleBack} className="ml-[10px]"/>
            </div>
            <div className="w-full md:w-1/2 mx-auto bg-white !p-[20px] border rounded-t-2xl min-h-[100vh]">
                {!submitted ? (
                    <div className={`flex justify-between items-start flex-col h-[75vh] ${fadeEffect}`}>
                        <div>
                            <div className="bg-[#f5f5f5] p-[15px] rounded-xl mt-[10px] mb-[20px]">
                                <p className="text-[#333] text-[12px] leading-[18px] mb-0 max-3-lines">{text}</p>
                            </div>
                            <h4 className="font-normal text-[#333333] text-[16px] font-semibold leading-[22px] mb-[15px]">Why do you want to report this message?</h4>
                            <form>
                                <div className="radio my-[4px]">
                                    <label className="flex items-center text-[14px] leading-[16px]">
                                        <input
                                            type="radio"
                                            value="Hateful"
                                            checked={selectedOption === "Hateful"}
                                            onChange={handleRadioChange}
                                            className={`my-2 w-5 h-4 accent-[${primaryColor}]`}
                                        />
                                        <span className="ml-2 text-[13px] text-[#333333] ">Hateful</span>
                                    </label>
                                </div>
                                <div className="radio my-[4px]">
                                    <label className="flex items-center text-[14px] leading-[16px]">
                                        <input
                                            type="radio"
                                            value="Abusive and Harassment"
                                            checked={selectedOption === "Abusive and Harassment"}
                                            onChange={handleRadioChange}
                                            className={`my-2 w-5 h-4 accent-[#912d2a]`}
                                        />
                                        <span className="ml-2 text-[13px] text-[#333333] ">Abusive and Harassment</span>
                                    </label>
                                </div>
                                <div className="radio my-[4px]">
                                    <label className="flex items-center text-[14px] leading-[16px]">
                                        <input
                                            type="radio"
                                            value="Spam"
                                            checked={selectedOption === "Spam"}
                                            onChange={handleRadioChange}
                                            className={`my-2 w-5 h-4 accent-[#912d2a]`}
                                        />
                                        <span className="ml-2 text-[13px] text-[#333333]">Spam</span>
                                    </label>
                                </div>
                                <div className="radio my-[4px]">
                                    <label className="flex items-center text-[14px] leading-[16px]">
                                        <input
                                            type="radio"
                                            value="Other"
                                            checked={selectedOption === "Other"}
                                            onChange={handleRadioChange}
                                            className={`my-2 w-5 h-4 accent-[#912d2a]`}
                                        />
                                        <span className="ml-2 text-[13px] text-[#333333]">Other</span>
                                    </label>
                                </div>
                                {selectedOption == 'Other' && <textarea value={otherText} onChange={handleTextChange} rows={5} placeholder="Not Appropriate For Children" className="resize-none w-full md:w-[50%] my-2 p-2 text-[14px] leading-[14px] border bg-[#FCFCFC]" />}
                            </form>
                        </div>
                        <button className="block bg-[#f3a01a] w-full text-center text-white border-none py-3 text-[16px] font-semibold leading-[12px] mt-2" type="submit" onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>
                ) : (
                    <div className={`flex items-center justify-center flex-col h-[75vh] fadeIn`}>
                        <img src="/assets/images/submitted-img.svg" width={80} height={80} alt="Submitted Icon" />
                        <p className="text-[20px] leading-[32px] text-center font-bold mt-[20px]">Your report has been submitted</p>
                        <p className="text-[16px] leading-[28px] text-center text-[#333] font-semibold px-[15px]">Thanks for your feedback, our team will look into it!</p>
                        <button className="w-[40%] py-[10px] bg-[#f3a01a] text-white mt-[30px] border-none" onClick={handleBack}>OK</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Report;