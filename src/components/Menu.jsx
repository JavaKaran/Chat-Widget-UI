import React from "react";

const Menu = ({ showHeaderMenu }) => {
    return(
        <div className={`p-2 bg-white transition ease-in-out rounded-md duration-500 z-30 shadow-md absolute right-[10px] ${showHeaderMenu ? 'show-menu' : 'hide-menu'}`}>
            <p className="mb-2 text-[12px] leading-[12px]">Share entire conversation</p>
            <p className="mb-1 text-[12px] leading-[12px]">Privacy Policy</p>
        </div>
    )
}

export default Menu;