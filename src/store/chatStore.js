import { create } from "zustand";

const useChatStore = create((set) => ({
  chats: {}, // Stores multiple chat sessions
  activeChat: "default", // Tracks the current chat session

  // Add a message to the active chat
  addMessage: (message) =>
    set((state) => ({
      chats: {
        ...state.chats,
        [state.activeChat]: [...(state.chats[state.activeChat] || []), message],
      },
    })),

  // Switch between chat sessions
  setActiveChat: (chatId) =>
    set((state) => ({
      activeChat: chatId,
      chats: {
        ...state.chats,
        [chatId]: state.chats[chatId] || [], // Ensure the chat exists
      },
    })),

  // Create a new chat session
  createNewChat: () =>
    set((state) => {
      const newChatId = `chat-${Date.now()}`; // Unique chat ID
      return {
        activeChat: newChatId,
        chats: { ...state.chats, [newChatId]: [] },
      };
    }),

  // ✅ Clear chat for the active session
  clearChat: () =>
    set((state) => ({
      chats: { ...state.chats, [state.activeChat]: [] },
    })),

  // ✅ Delete all chat sessions
  deleteAllChats: () =>
    set({
      chats: {},
      activeChat: "default",
    }),
}));

export default useChatStore;
