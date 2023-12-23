import React from "react";

const Header = ({ bot, handleShowMenu, primary }) => {

  return (
    <div className={`flex items-center justify-between pt-[8px] py-3 sm:py-3  border-b-2 px-3 border-gray-200`} style={{ backgroundColor: primary}}>
      <div className="relative flex items-center space-x-4">
        <img src={bot.image} alt="Brainstormer Logo" className="w-10 sm:w-16 h-10 sm:h-16 rounded-full" />
        <div className="flex flex-col leading-tight">
          <div className="text-lg sm:text-2xl leading-6">
            <span className="text-white mr-3">{bot.name}</span>
          </div>
          <span className="text-xs sm:text-sm text-white mr-3">{bot.description}</span>
        </div>
      </div>
      {/* <div className="cursor-pointer flex ml-1" onClick={handleShowMenu}>
        <img src="/assets/images/menu-option-icon.svg" width="18" height="18" alt="Menu Icon" />
      </div> */}
    </div>
  )
}

export default Header;