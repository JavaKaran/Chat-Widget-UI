import React from 'react'

const Sources = ({showSources, setShowSources, handleSourceMenu}) => {
  return (<>
        <div className={`absolute top-0 w-full h-full z-20 ${showSources ? 'block' : 'hidden'}`}  onClick={handleSourceMenu}>
            <div className='bg-[rgba(0,0,0,0.7)] flex justify-end flex-col h-full w-full'>
                
            </div>
        </div>
        <div className={`rounded-t-xl bg-white p-3 pb-2 transition ease-in-out duration-500 divide-y divide-[#000000] relative z-50 ${showSources ? 'block' : 'hidden'}`}>
            <h2 className='font-semibold text-[18px]'>Sources</h2>
            <ul className='list-none p-0 mx-auto w-full'>
                <li className='my-[20px]'>
                    <a className='cursor-pointer text-[16px] text-[#333333]'>
                        <img src="/assets/images/pdf-ic2.svg" alt="pdf-icon" width="22px" height="22px" className='mr-[10px]' />
                        <span>FinancialReport2023</span>
                    </a>
                </li>
                <li className='my-[20px]'>
                    <a className='cursor-pointer text-[16px] text-[#333333]'>
                        <img src="/assets/images/pdf-ic2.svg" alt="pdf-icon" width="22px" height="22px" className='mr-[10px]'/>
                        <span>FinancialReport2023</span>
                    </a>
                </li>
                <li className='my-[20px]'>
                    <a className='cursor-pointer text-[16px] text-[#333333]'>
                        <img src="/assets/images/pdf-ic2.svg" alt="pdf-icon" width="22px" height="22px" className='mr-[10px]'/>
                        <span>FinancialReport2023</span>
                    </a>
                </li>
                <li className='my-[20px]'>
                    <a className='cursor-pointer text-[16px] text-[#333333]'>
                        <img src="/assets/images/pdf-ic2.svg" alt="pdf-icon" width="22px" height="22px" className='mr-[10px]'/>
                        <span>FinancialReport2023</span>
                    </a>
                </li>
            </ul>
        </div>
        </>
  )
}

export default Sources