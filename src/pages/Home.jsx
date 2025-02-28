import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import { Menu } from "lucide-react";
import Icons from "../components/Icons";

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768); 

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false); 
      } else {
        setIsSidebarOpen(true); 
      }
    };

    handleResize(); 
    window.addEventListener("resize", handleResize); 

    return () => window.removeEventListener("resize", handleResize); 
  }, []);

  return (
    <div className="h-screen flex bg-[#212121] overflow-hidden">

      <Icons />

      {!isSidebarOpen && (
        <button
          className="absolute left-4 top-4 p-2 text-white bg-[#171717] rounded-lg hover:bg-[#303030] z-50 md:hidden"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu size={24} />
        </button>
      )}

      <div
        className={`fixed md:static top-0 left-0 h-screen transition-all duration-300 ${
          isSidebarOpen ? "w-[260px] md:w-[260px]" : "w-0 md:w-[80px]"
        } overflow-hidden bg-[#171717] z-50 md:relative`}
      >
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>

      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "w-4/5 md:w-4/5" : "w-full md:w-full"
        } overflow-y-auto custom-scrollbar `}
      >
        <Chat />
      </div>
    </div>
  );
};

export default Home;
