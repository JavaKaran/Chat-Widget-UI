
const PromptsSuggestion = ({ showPrompts, handlePromptsMenu, handlePromptClick }) => {

    return (
        <div className={`fixed bottom-[55px] w-full px-3 bg-white py-2 border-t border-[#ececec] transition ease-in-out duration-700 ${ showPrompts ? 'show-menu' : 'hide-menu' }`}>
            <div className="flex items-center justify-between mt-2 mb-3">
                <p className="mb-0 text-[16px] font-semibold">Try Asking</p>
                <div className="" onClick={handlePromptsMenu}>
                    <img src="/assets/images/close-icon.svg" />
                </div>
            </div>
            <div className="">
                <div className="bg-[#fcfcfc] border border-[#e9e9e9] rounded-[5px] p-1 my-2" onClick={() => {handlePromptClick('What syllabus does qatar government follow?')}}>
                    <p className="text-[14px] mb-0">What syllabus does qatar government follow?</p>
                </div>
                <div className="bg-[#fcfcfc] border border-[#e9e9e9] rounded-[5px] p-1 my-2" onClick={() => {handlePromptClick('What syllabus does qatar government follow?')}}>
                    <p className="text-[14px] mb-0">What syllabus does qatar government follow?</p>
                </div>
                <div className="bg-[#fcfcfc] border border-[#e9e9e9] rounded-[5px] p-1 my-2" onClick={() => {handlePromptClick('What syllabus does qatar government follow?')}}>
                    <p className="text-[14px] mb-0">What syllabus does qatar government follow?</p>
                </div>
            </div>
        </div>
    )
}

export default PromptsSuggestion;