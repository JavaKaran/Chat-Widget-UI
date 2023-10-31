import React from "react";

const Header = ({ bot, handleShowMenu }) => {

  return (
    <div className={`flex items-center justify-between pt-2 py-3 sm:py-3 bg-[${bot.primaryColor}] border-b-2 px-3 border-gray-200`}>
      <div className="relative flex items-center space-x-4">
        <img src={bot.image} alt="Brainstormer Logo" className="w-8 sm:w-16 h-8 sm:h-16 rounded-full" />
        <div className="flex flex-col leading-tight">
          <div className="text-lg sm:text-2xl">
            <span className="text-white mr-3">{bot.name}</span>
          </div>
          <span className="text-xs sm:text-sm text-white">{bot.description}</span>
        </div>
      </div>
      <div className="cursor-pointer flex ml-1" onClick={handleShowMenu}>
        <img src="/assets/images/menu-option-icon.svg" width="18" height="18" alt="Menu Icon" />
      </div>
    </div>
  )
}

export default Header;