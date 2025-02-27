import {
  Menu,
  Search,
  Trash2,
  MessageCircle,
  Dice4,
  FilePenLine,
} from "lucide-react";
import PropTypes from "prop-types";
import useChatStore from "../store/chatStore"; // ✅ Zustand store for chat management
import img1 from "../assets/chatgpt2.jpg";
import img2 from "../assets/chatgpt2.jpg";
import img3 from "../assets/chatgpt3.jpg";
import img4 from "../assets/chatgpt4.jpg";
import img5 from "../assets/chatgpt5.jpg";
import img6 from "../assets/chatgpt6.jpg";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const { chats, activeChat, setActiveChat, createNewChat, deleteAllChats } =
    useChatStore(); // ✅ Zustand store functions

  // ✅ Static Chatbot List (Dynamically Mapped)
  const chatBots = [
    { name: "ChatGPT", imgSrc: img1 },
    { name: "Sora", imgSrc: img2 },
    { name: "Expedia", imgSrc: img3 },
    { name: "Web Gen", imgSrc: img4 },
    { name: "Consensus", imgSrc: img5 },
    { name: "DALL-E", imgSrc: img6 },
  ];

  return (
    <div className="h-screen  bg-[#171717] text-white px-4 pt-2 flex flex-col transition-transform duration-300">
      {/* Menu Button - Always Visible When Sidebar is Closed */}
      {!isSidebarOpen && (
        <button
          className="absolute top-4  left-4 p-2 bg-[#171717] text-white rounded-lg hover:bg-[#303030] z-50"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu size={20} />
        </button>
      )}

      {/* Sidebar Content (Only Visible When Open) */}
      {isSidebarOpen && (
        <>
          {/* Sidebar Header - Menu, Search, New Chat */}
          <div className="flex justify-between">
            <button
              className=" p-2 rounded-lg text-neutral-200 "
              onClick={() => setIsSidebarOpen(false)}
            >
              <Menu size={20} />
            </button>
            <div className="space-x-1 ">
              <div className="tooltip-container">
                <button className=" p-2 rounded-lg text-neutral-200 hover:bg-[#303030]">
                  <Search size={20} />
                </button>
                <span className="tooltip-text mt-1">Search Chats</span>
              </div>

              <div className="tooltip-container">
                <button
                  className=" p-2 rounded-lg text-neutral-200 hover:bg-[#303030]"
                  onClick={createNewChat}
                >
                  {" "}
                  <FilePenLine size={20} />
                </button>
                <span className="tooltip-text mt-1 pr-10 -ml-3">New Chat</span>
              </div>
            </div>
          </div>

          {/* ✅ Dynamic Chatbot List (Mapped) */}
          <div className="flex-1 mt-3 overflow-y-auto custom-scrollbar ml-1">
            {chatBots.map((bot, index) => (
              <div key={index} className="flex items-center pb-3 space-x-2">
                <img
                  src={bot.imgSrc}
                  alt={bot.name}
                  className="w-6 h-6 rounded-full"
                />
                <h1 className="text-[14px] text-neutral-200">{bot.name}</h1>
              </div>
            ))}
            <div className=" flex items-center space-x-2 m-[0.5px] pb-10 ">
              <Dice4 size={22} />{" "}
              <h1 className="text-[14px] text-neutral-200">Explore Gpts</h1>
            </div>
            {/* ✅ Dynamic User Chats from Zustand */}
            {Object.keys(chats).length > 0 ? (
              Object.keys(chats).map((chatId) => (
                <div
                  key={chatId}
                  className={`flex items-center p-2 text-[14px]  rounded cursor-pointer ${
                    activeChat === chatId ? "bg-[#303030]" : "bg-[#171717]"
                  } hover:bg-[#404040] transition`}
                  onClick={() => setActiveChat(chatId)}
                >
                  <MessageCircle size={16} className="mr-2" />
                  {chatId === "default"
                    ? "Default Chat"
                    : `Chat ${chatId.split("-")[1]}`}
                </div>
              ))
            ) : (
              <p className="text-gray-400 p-4">No Chats Yet</p>
            )}
          </div>

          {/* ✅ "Clear All Chats" Button */}

          <div className="tooltip-container">
            <button
              className="my-4 w-full p-2 mb-16 md:mb-5 flex items-center justify-center bg-red-500 rounded hover:bg-red-700"
              onClick={() => {
                if (
                  window.confirm("Are you sure you want to delete all chats?")
                ) {
                  deleteAllChats();
                }
              }}
            >
              <Trash2 size={20} className="mr-2 " /> Clear All Chats
            </button>
            <span className="tooltip-text -mt-28 ">Delete all chats</span>
          </div>
        </>
      )}
    </div>
  );
};

// ✅ Add PropTypes validation
Sidebar.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
  setIsSidebarOpen: PropTypes.func.isRequired,
};

export default Sidebar;
