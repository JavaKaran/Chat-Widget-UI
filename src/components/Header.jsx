import React, { useState, useEffect, useMemo } from "react";


const Header = () => {

  const [license, setLicense] = useState('');
  const [bot, setBot] = useState({
    name: 'BrainStormer',
    description: "Let's Brainstorm the future!",
  });

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const license = urlParams.get("license");
    setLicense(license);

    if(license === "123"){
      setBot({
        name: 'HomeWorkHero',
        description: "Let's make the homework interesting!"
      })
    }
  }, []);

  return (
    <div className="flex sm:items-center justify-between py-3 bg-[#ebebebde] border-b-2 px-6 border-gray-200">
      <div className="relative flex items-center space-x-4">
        <img src="../../App icon.png" alt="Brainstormer Logo" className="w-10 sm:w-16 h-10 sm:h-16 rounded-full" />
        <div className="flex flex-col leading-tight">
          <div className="text-2xl mt-1 flex items-center">
            <span className="text-gray-700 mr-3">{bot.name}</span>
          </div>
          <span className="text-sm text-gray-600">{bot.description}</span>
        </div>
      </div>
    </div>
  )
}

export default Header;