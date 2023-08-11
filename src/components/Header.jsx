import React from "react";

const Header = ({ bot }) => {

  return (
    <div className="flex sm:items-center justify-between py-2 sm:py-3 bg-[#ebebebde] border-b-2 px-6 border-gray-200">
      <div className="relative flex items-center space-x-4">
        <img src={bot.image} alt="Brainstormer Logo" className="w-8 sm:w-16 h-8 sm:h-16 rounded-full" />
        <div className="flex flex-col leading-tight">
          <div className="text-lg sm:text-2xl">
            <span className="text-gray-700 mr-3">{bot.name}</span>
          </div>
          <span className="text-xs sm:text-sm text-gray-600">{bot.description}</span>
        </div>
      </div>
    </div>
  )
}

export default Header;