import axios from "axios";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${API_KEY}`;

export const getGeminiResponse = async (userMessage) => {
  try {
    const response = await axios.post(API_URL, {
      contents: [{ parts: [{ text: userMessage }] }],
    });

    return (
      response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from AI."
    );
  } catch (error) {
    console.error("Gemini API Error:", error);

    if (error.response) {
      const status = error.response.status;
      const message = error.response.data.error?.message || "Unknown API Error";

      // Handling specific API errors
      if (status === 403)
        return "⚠️ Invalid API Key or insufficient permissions.";
      if (status === 429) return "⚠️ Rate limit exceeded. Try again later.";
      if (status === 500) return "⚠️ Server error. Please try again.";

      return `API Error: ${message}`;
    } else if (error.request) {
      return "⚠️ Network Error: Unable to connect to the AI server.";
    } else {
      return "⚠️ Unexpected Error: Something went wrong.";
    }
  }
};
