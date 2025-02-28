import { Menu, Plus, Search, Trash2, MessageCircle } from "lucide-react";
import PropTypes from "prop-types";
import useChatStore from "../store/chatStore"; 

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const { chats, activeChat, setActiveChat, createNewChat, deleteAllChats } = useChatStore(); 
  return (
    <div className="h-screen bg-[#171717] text-white px-4 pt-2 flex flex-col transition-transform duration-300">
      {/* Menu Button - Always Visible When Sidebar is Closed */}
      {!isSidebarOpen && (
        <button
          className="absolute top-4 left-4 p-2 bg-[#171717] text-white rounded-lg hover:bg-[#303030] z-50"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu size={20} />
        </button>
      )}

      {isSidebarOpen && (
        <>
          <div className="flex justify-between">
            <button
              className="mb-4 p-2 rounded-lg hover:bg-[#303030]"
              onClick={() => setIsSidebarOpen(false)}
            >
              <Menu size={20} />
            </button>
            <div className="space-x-3">
              <button className="mb-4 p-2 rounded-lg hover:bg-[#303030]">
                <Search size={20} />
              </button>
              <button
                className="mb-4 p-2 rounded-lg hover:bg-[#303030] flex items-center"
                onClick={createNewChat} // ✅ Create a new chat
              >
                <Plus size={20} className="mr-2" /> New Chat
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {Object.keys(chats).length > 0 ? (
              Object.keys(chats).map((chatId) => (
                <div
                  key={chatId}
                  className={`flex items-center p-2 mb-2 rounded cursor-pointer ${
                    activeChat === chatId ? "bg-[#303030]" : "bg-[#2f2f2f]"
                  } hover:bg-[#404040] transition`}
                  onClick={() => setActiveChat(chatId)}
                >
                  <MessageCircle size={16} className="mr-2" />
                  {chatId === "default" ? "Default Chat" : `Chat ${chatId.split("-")[1]}`}
                </div>
              ))
            ) : (
              <p className="text-gray-400 p-4">No Chats Yet</p>
            )}
          </div>

          <button
            className="mt-4 p-2 flex items-center justify-center bg-red-500 rounded hover:bg-red-700"
            onClick={() => {
              if (window.confirm("Are you sure you want to delete all chats?")) {
                deleteAllChats();
              }
            }}
          >
            <Trash2 size={20} className="mr-2" /> Clear All Chats
          </button>
        </>
      )}
    </div>
  );
};

//  PropTypes validation
Sidebar.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
  setIsSidebarOpen: PropTypes.func.isRequired,
};

export default Sidebar;
