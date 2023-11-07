import React from 'react'

const Sources = ({showSources, setShowSources, handleSourceMenu}) => {
  return (<>
        <div className={`fixed top-0 w-full h-full z-20 ${showSources ? 'block' : 'hidden'}`}  onClick={handleSourceMenu}>
            <div className='bg-[rgba(0,0,0,0.7)] flex justify-end flex-col h-full w-full'>
                
            </div>
        </div>
        <div className={`source-list-ct rounded-t-xl bg-white p-3 py-2 transition ease-in-out duration-500 divide-y divide-[#000000] fixed w-full bottom-0 z-50 ${showSources ? 'show-source-menu' : 'hide-source-menu'}`}>
            <h2 className='font-semibold text-[16px]'>Sources</h2>
            <ul className='source-list list-none p-0 mx-auto w-full mb-0'>
                <li className='source-item my-[0px] py-[10px]'>
                    <a className='cursor-pointer text-[13px] text-[#333333]'>
                        <img src="/assets/images/pdf-ic2.svg" alt="pdf-icon" width="22px" height="22px" className='mr-[10px]' />
                        <span>FinancialReport2023</span>
                    </a>
                </li>
                <li className='source-item my-[0px] py-[10px]'>
                    <a className='cursor-pointer text-[13px] text-[#333333]'>
                        <img src="/assets/images/pdf-ic2.svg" alt="pdf-icon" width="22px" height="22px" className='mr-[10px]'/>
                        <span>FinancialReport2023</span>
                    </a>
                </li>
                <li className='source-item my-[0px] py-[10px]'>
                    <a className='cursor-pointer text-[13px] text-[#333333]'>
                        <img src="/assets/images/pdf-ic2.svg" alt="pdf-icon" width="22px" height="22px" className='mr-[10px]'/>
                        <span>FinancialReport2023</span>
                    </a>
                </li>
                <li className='source-item my-[0px] py-[10px]'>
                    <a className='cursor-pointer text-[13px] text-[#333333]'>
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