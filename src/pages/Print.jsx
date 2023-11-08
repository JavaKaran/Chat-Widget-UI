import React from "react";

const Print = () => {
    return (
        <div className="bg-[#912d2a] h-[100vh] w-full">
            <div className="h-[85%] bg-white rounded-t-2xl absolute bottom-0 w-full">
                <div className="flex justify-between items-center flex-col h-full">
                    <div className="">
                        <div className="flex items-center justify-center my-10">
                            <img src="/assets/images/eaa-logo.png" width={150} height={62} alt="Education For All" />
                        </div>
                        <p className="text-[12px] leading-[16px] text-[#333] w-[85%] mx-auto">
                            FERBy is our AI generated bot. This will help you with any details that you need to better understand education in Qatar. Lorem ipsum dolor sit amet consectetur. Viverra egestas lacus habitant porttitor feugiat nibh. Senectus enim tortor lorem lacus. Tellus vitae vel faucibus dis massa rhoncus
                            Ask FERBy from the below question to get started:
                        </p>
                    </div>
                    <div className="py-8">
                        <div className="border border-[#912d2a] rounded-lg flex items-center px-7 py-3 flex-col">
                            <p className="text-[10px] leading-[12px] font-bold mb-1 text-[#333]">check out more info here:</p>
                            <a href="https://www.educationaboveall.org/" className="text-[12px] leading-[14px] font-bold mb-0 text-[#333]">https://www.educationaboveall.org/</a>
                        </div>
                        <p className="text-[12px] leading-[16px] text-[#333] font-bold text-center mt-4 mb-0">02:15 pm, 26th October 2023</p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Print;