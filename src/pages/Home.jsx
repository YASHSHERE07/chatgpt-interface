import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import { Menu } from "lucide-react";
import Icons from "../components/Icons";

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768); // ✅ Default: Closed on Mobile, Open on Desktop

  // ✅ Auto-close sidebar on small screens when resizing
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false); // Close sidebar on small screens
      } else {
        setIsSidebarOpen(true); // Open sidebar on desktop screens
      }
    };

    handleResize(); // Run on load
    window.addEventListener("resize", handleResize); // Listen for window resize

    return () => window.removeEventListener("resize", handleResize); // Cleanup
  }, []);

  return (
    <div className="h-screen flex bg-[#212121] overflow-hidden">
      {/* Top Right Buttons (Profile & JSON) */}

      <Icons />

      {/* ✅ Menu Button (Always Visible on Mobile) */}
      {!isSidebarOpen && (
        <button
          className="absolute left-4 top-4 p-2 text-white bg-[#171717] rounded-lg hover:bg-[#303030] z-50 md:hidden"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu size={24} />
        </button>
      )}

      {/* ✅ Sidebar (Sticky for Desktop, Fullscreen Overlay for Mobile) */}
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

      {/* ✅ Chat Section (Expands Full Width on Mobile) */}
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
