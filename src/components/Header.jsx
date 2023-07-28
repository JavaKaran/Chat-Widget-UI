import React from "react";

const Header = () => {
    return(
        <div className="flex sm:items-center justify-between py-3 bg-[#ebebebde] border-b-2 px-6 border-gray-200">
        <div className="relative flex items-center space-x-4">
          <img src="../../App icon.png" alt="Brainstormer Logo" className="w-10 sm:w-16 h-10 sm:h-16 rounded-full" />
          <div className="flex flex-col leading-tight">
            <div className="text-2xl mt-1 flex items-center">
              <span className="text-gray-700 mr-3">Brainstormer</span>
            </div>
            <span className="text-sm text-gray-600">Let's Brainstorm the future!</span>
          </div>
        </div>
      </div>
    )
}

export default Header;