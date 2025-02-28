# 🚀 AI Chatbot Web App

An advanced AI chatbot built using **React, Tailwind CSS, Zustand, and OpenAI's Gemini API**. The chatbot supports **real-time AI responses, tooltips, chat memory, and a clean UI**. 

🌟 **Live Demo**:  *https://chatgpt-interface-phi.vercel.app/*

---

## 📌 Features

✅ **AI-Powered Chat** - Uses Gemini API for intelligent responses.  
✅ **Real-Time Messaging** - Seamless user experience with instant AI replies.  
✅ **Chat Memory** - Stores previous messages in a session.  
✅ **Custom Scrollbar** - Sleek and optimized UI experience.  
✅ **Sidebar Navigation** - Easy access to options & history.  
✅ **Tooltips & UI Enhancements** - Hover effects and interactive UI elements.  
✅ **Mobile Responsive** - Fully optimized for desktop & mobile.  

---

## 🛠️ Installation & Setup

### 1️⃣ **Clone the Repository**
```sh
git clone https://github.com/yourusername/ai-chatbot.git
cd ai-chatbot
```



### 2️⃣ **Install Dependencies**
```sh
npm install
```

### 3️⃣ Set Up Environment Variables
Create a .env file in the root directory and add your API key:
```sh

VITE_GEMINI_API_KEY=your-api-key-here
```
### 4️⃣ Run the Development Server
```sh

npm run dev

```
Open http://localhost:5173 in your browser.

---
---

## 🖥️ Usage Guide

### **🤖 Chat with AI**
1. Type your message in the input field.  
2. Press `Enter` or click the **Send** button.  
3. The AI will respond instantly!  

### **📂 Sidebar & Tools**
- **Upload Files & More** 📂  
- **Search the Web** 🌎  
- **View Tools & Features** ⚙️  

### **🎨 UI Enhancements**
- **Tooltips** appear when hovering over icons.  
- **Scrollbar is optimized** for a better experience.  
- **Help text (`What can I help with?`)** disappears once the chat starts.  

---

## 🎨 Design Decisions

### **1️⃣ User Experience (UX) First Approach**
- **Minimalistic UI**: Clean and distraction-free interface.
- **Dynamic Help Text**: `"What can I help with?"` disappears when the user starts chatting.
- **Smooth Animations**: Chat messages fade in, creating a natural conversation flow.

### **2️⃣ State Management with Zustand**
- **Efficient State Handling**: Zustand is used instead of Redux for simplicity and performance.
- **Persists Chat Sessions**: Conversations remain active while navigating.

### **3️⃣ Optimized Performance**
- **Vite for Development**: Ensures fast build and hot module replacement.
- **Lazy Loading Components**: Improves initial page load times.

### **4️⃣ Mobile-Friendly & Responsive**
- **Adaptive Sidebar**: Collapses on mobile, expands on desktop.
- **Optimized Scrollbars**: Custom scrollbars for both sidebar and chat.

### **5️⃣ Accessibility & Usability**
- **Keyboard Shortcuts**: Press `Enter` to send messages.
- **Contrast & Readability**: Uses high-contrast colors for better visibility.

---



