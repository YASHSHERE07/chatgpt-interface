import { useState, useMemo, useEffect } from "react";
import useChatStore from "../store/chatStore";
import { getGeminiResponse } from "../api/geminiApi";
import ReactMarkdown from "react-markdown";
import { ArrowUp, Square, Trash2, Plus, Globe, Ellipsis } from "lucide-react";

const Chat = () => {
  const { chats, activeChat, addMessage, clearChat } = useChatStore();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [showHelpText, setShowHelpText] = useState(true); // ✅ Initially shows help text

  const handleSend = async () => {
    if (!input.trim()) return;

    addMessage({ text: input, sender: "user" });

    setInput("");
    setLoading(true);
    setError(null);
    setIsTyping(true);
    setShowHelpText(false); // ✅ Hide help text on message send

    try {
      const botReply = await getGeminiResponse(input);

      if (botReply.startsWith("⚠️")) {
        setError(botReply);
      } else {
        addMessage({ text: botReply, sender: "bot" }); // ✅ Add bot response to chat
      }
    } catch {
      setError("⚠️ Unexpected Error. Please try again.");
    }

    setLoading(false);
    setIsTyping(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
      setShowHelpText(false); // ✅ Hide help text when user presses Enter
    }
  };

  const memoizedMessages = useMemo(
    () => chats[activeChat] || [],
    [chats, activeChat]
  );

  // ✅ Hide help text when there are chat messages
  useEffect(() => {
    if (memoizedMessages.length > 0) {
      setShowHelpText(false);
    }
  }, [memoizedMessages]);

  return (
    <div className="flex h-screen w-4/5 mx-auto bg-[#212121]">
      <div className="flex flex-col pt-16 md:pt-20 flex-1 max-w-3xl mx-auto text-white relative">
        {/* ✅ Help Text in the Center (Only When No Messages) */}
        {showHelpText && (
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white text-[30px] font-semibold ">
            <p>What can I help with?</p>
          </div>
        )}

        <div className="flex-1 p-4">
          {memoizedMessages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 p-3 rounded ${
                msg.sender === "user"
                  ? "bg-[#424242] rounded-2xl self-end text-right ml-auto max-w-fit"
                  : "bg-[#212121] fade-in -ml-10 md:-ml-0 mt-10 md:mr-32 p-3 rounded-lg self-start max-w-[75%] text-left"
              }`}
            >
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
          ))}

          {/* ✅ Typing Animation */}
          {isTyping && <div className="text-gray-400">Typing...</div>}
        </div>

        {/* Show API error messages separately */}
        {error && (
          <div className="p-3 bg-red-500 text-white text-center">
            {error}{" "}
            <button className="underline" onClick={handleSend}>
              Retry
            </button>
          </div>
        )}

        {/* Input and Buttons Section */}
        <div className="p-3 flex items-center rounded-t-3xl bg-[#303030]">
          <input
            type="text"
            className="flex-1 p-2 bg-[#303030] text-white rounded-full outline-none text-sm"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything..."
          />
        </div>

        {/* Action Buttons Section */}
        <div className="flex justify-between space-x-3 rounded-b-3xl px-3 py-2 mb-2 bg-[#303030]">
          {/* Left-side Buttons */}
          <div className="flex space-x-2">
            <div className="tooltip-container">
              <button className="rounded-full border p-2 w-8 h-8 flex items-center justify-center text-neutral-400 border-neutral-400">
                <Plus size={14} />
              </button>
              <span className="tooltip-text -mt-[90px] ">
                Upload Files and More
              </span>
            </div>

            <div className="tooltip-container">
              <button className="flex items-center rounded-full border mb-3 px-3 py-2 text-xs text-neutral-400 border-neutral-400">
                <Globe size={16} /> <span className="pl-1">Search</span>
              </button>
              <span className="tooltip-text -mt-[90px] ">Search the web</span>
            </div>

            <div className="tooltip-container">
              <button className="rounded-full border p-2 w-8 h-8 flex items-center justify-center text-neutral-400 border-neutral-400">
                <Ellipsis size={16} />
              </button>
              <span className="tooltip-text -mt-[90px] ">View Tools</span>
            </div>
          </div>

          {/* Right-side Buttons */}
          <div className="flex space-x-2">
            <div className="tooltip-container">
              <button
                className="p-2 w-9 h-9 bg-white text-black rounded-full flex items-center justify-center"
                onClick={handleSend}
                disabled={loading}
              >
                {loading ? (
                  <Square size={18} fill="black" />
                ) : (
                  <ArrowUp size={18} />
                )}
              </button>
              <span className="tooltip-text -mt-[90px] ">Message</span>
            </div>

            <div className="tooltip-container">
              <button
                className="p-2 w-9 h-9 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-700"
                onClick={clearChat}
              >
                <Trash2 size={18} />
              </button>
              <span className="tooltip-text -mt-[90px] ">
                Delete Current Chat
              </span>
            </div>
          </div>
        </div>
        <h1 className="mb-2 text-center text-[12px]">
          ChatGPT can make mistakes. Check important info.
        </h1>
      </div>
    </div>
  );
};

export default Chat;
