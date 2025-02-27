import { useState, useEffect } from "react";
import {
  CircleHelp,
  CirclePlus,
  CircleUser,
  Clipboard,
  Copy,
  FileJson,
  Keyboard,
  Laptop,
  List,
  LogOut,
  SlidersHorizontal,
  SquareArrowOutUpRight,
  UserRoundSearch,
} from "lucide-react";

const Icons = () => {
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);

  // ✅ Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".help-dropdown") &&
        !event.target.closest(".user-dropdown")
      ) {
        setIsHelpOpen(false);
        setIsUserOpen(false);
      }
    };

    if (isHelpOpen || isUserOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isHelpOpen, isUserOpen]);

  return (
    <div>
      <div className="absolute right-0 md:right-4 top-1 p-2 flex items-center space-x-2  z-50">
        <div className="tooltip-container">
          <button className="p-2 text-white rounded-lg hover:bg-[#171717]">
            <FileJson size={20} />
          </button>
          <span className="tooltip-text mt-2">Open Canvas</span>
        </div>
        <div className="relative user-dropdown">
          <button
            className="rounded-full hover:bg-neutral-700 focus:outline-none"
            onClick={() => {
              setIsUserOpen(!isUserOpen);
              setIsHelpOpen(false);
            }}
          >
            <CircleUser size={44} fill="#ececec" />
          </button>

          {/* User Dropdown */}
          {isUserOpen && (
            <div className="absolute top-14 right-5 bg-[#2f2f2f] text-neutral-200 text-sm rounded-2xl shadow-2xl w-64 p-2 z-50">
              <ul className="space-y-2">
                <li className="hover:bg-[#424242] flex items-center space-x-2 p-2 rounded cursor-pointer">
                  <Clipboard size={18} /> <h1>Tasks BETA</h1>
                </li>
                <li className="hover:bg-[#424242] flex items-center space-x-3 p-2 rounded cursor-pointer">
                  <UserRoundSearch size={18} /> <h1> My GPTs </h1>
                </li>
                <li className="hover:bg-[#424242] flex items-center space-x-3 p-2 rounded cursor-pointer">
                  <SlidersHorizontal size={18} /> <h1> Customize ChatGPT </h1>
                </li>
                <li className="hover:bg-[#424242] border- flex items-center space-x-3 p-2 rounded cursor-pointer">
                  <List size={18} /> <h1>Settings </h1>
                </li>
                <li className="border-t-2 mx-2 border-neutral-700" />
                <li className="hover:bg-[#424242] flex items-center space-x-3 p-2 rounded cursor-pointer">
                  <Laptop size={18} /> <h1>Download the Windows app</h1>
                </li>
                <li className="hover:bg-[#424242] flex items-center space-x-3 p-2 rounded cursor-pointer">
                  <CirclePlus size={18} /> <h1>Upgrade Plan </h1>
                </li>
                <li className="border-t-2 mx-2 border-neutral-700" />

                <li className="hover:bg-[#424242] flex items-center space-x-3 p-2 rounded cursor-pointer">
                  <LogOut size={18} /> <h1> Log out </h1>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="absolute invisible md:visible  md:right-8 md:bottom-3  text-neutral-400  flex space-x-4">
        <div className="relative help-dropdown">
          <button
            className="cursor-pointer hover:text-white focus:outline-none"
            onClick={() => {
              setIsHelpOpen(!isHelpOpen);
              setIsUserOpen(false);
            }}
          >
            <CircleHelp size={20} />
          </button>

          {isHelpOpen && (
            <div className="absolute bottom-9 right-4 bg-[#2f2f2f] text-white text-sm rounded-2xl shadow-2xl w-64 p-2 z-50">
              <ul className="space-y-2">
                <li className="hover:bg-[#424242] flex items-center space-x-3 p-2 rounded cursor-pointer">
                  <Copy size={18} /> <h1> 123456@gmail.com</h1>
                </li>{" "}
                <li className="hover:bg-[#424242] flex items-center space-x-3 p-2 rounded cursor-pointer">
                  <SquareArrowOutUpRight size={18} /> <h1> Help & FAQ </h1>
                </li>{" "}
                <li className="hover:bg-[#424242] flex items-center space-x-3 p-2 rounded cursor-pointer">
                  <SquareArrowOutUpRight size={18} /> <h1> Release notes </h1>
                </li>{" "}
                <li className="hover:bg-[#424242] flex items-center space-x-3 p-2 rounded cursor-pointer">
                  <SquareArrowOutUpRight size={18} />{" "}
                  <h1> Terms & policies </h1>
                </li>{" "}
                <li className="hover:bg-[#424242] flex items-center space-x-3 p-2 rounded cursor-pointer">
                  <Keyboard size={18} /> <h1> Keyboard shortcuts </h1>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* ✅ User Icon */}
      </div>
    </div>
  );
};

export default Icons;
