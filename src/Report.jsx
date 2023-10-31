import React, { useState } from "react";

const Report = ({ setShowReport }) => {

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
        <div className="absolute bottom-0 w-full h-full bg-[#912d2a]">
            <div className="flex p-3 h-[10vh] cursor-pointer">
                <img src="/assets/images/back-icon.svg" width={16} height={16} alt="Back" onClick={handleBack} />
            </div>
            <div className="w-full md:w-1/2 mx-auto bg-white p-2 border rounded-t-2xl min-h-[18vh]">
                {!submitted ? (
                    <div className="flex justify-between items-start flex-col h-full">
                        <div>
                            <p className="text-[#333] text-[12px] leading-[14px] bg-[#f5f5f5] p-2 rounded-xl">FERBy is our AI generated bot. This will help you with any details that you need to better understand education in Qatar. Lorem ipsum dolor sit ...</p>
                            <h4 className="text-[16px] leading-[18px] font-normal">Why do you want to report this message?</h4>
                            <form>
                                <div className="radio">
                                    <label className="flex items-center text-[14px] leading-[16px]">
                                        <input
                                            type="radio"
                                            value="Hateful"
                                            checked={selectedOption === "Hateful"}
                                            onChange={handleRadioChange}
                                            className="my-2 accent-[#912d2a]"
                                        />
                                        <span className="ml-2">Hateful</span>
                                    </label>
                                </div>
                                <div className="radio">
                                    <label className="flex items-center text-[14px] leading-[16px]">
                                        <input
                                            type="radio"
                                            value="Abusive and Harassment"
                                            checked={selectedOption === "Abusive and Harassment"}
                                            onChange={handleRadioChange}
                                            className="my-2 accent-[#912d2a]"
                                        />
                                        <span className="ml-2">Abusive and Harassment</span>
                                    </label>
                                </div>
                                <div className="radio">
                                    <label className="flex items-center text-[14px] leading-[16px]">
                                        <input
                                            type="radio"
                                            value="Spam"
                                            checked={selectedOption === "Spam"}
                                            onChange={handleRadioChange}
                                            className="my-2 accent-[#912d2a]"
                                        />
                                        <span className="ml-2">Spam</span>
                                    </label>
                                </div>
                                <div className="radio">
                                    <label className="flex items-center text-[14px] leading-[16px]">
                                        <input
                                            type="radio"
                                            value="Other"
                                            checked={selectedOption === "Other"}
                                            onChange={handleRadioChange}
                                            className="my-2 accent-[#912d2a]"
                                        />
                                        <span className="ml-2">Other</span>
                                    </label>
                                </div>
                                {selectedOption == 'Other' && <textarea value={otherText} onChange={handleTextChange} rows={5} placeholder="Not Appropriate For Children" className="resize-none w-full md:w-[50%] my-2 p-2 text-[14px] leading-[14px]" />}
                            </form>
                        </div>
                        <button className="block bg-[#f3a01a] w-full text-center text-white border-none py-2 text-[12px] leading-[12px] mt-2" type="submit" onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full flex-col">
                        <img src="/assets/images/submitted-img.svg" width={80} height={80} alt="Submitted Icon" />
                        <p className="text-[16px] leading-[18px] font-bold">Your report has been submitted</p>
                        <p className="text-[14px] leading-[16px] text-center text-[#333]">Thanks for your feedback, our team will look into it!</p>
                        <button className="w-[25%] py-3 bg-[#f3a01a] text-white mt-3 border-none" onClick={handleBack}>OK</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Report;