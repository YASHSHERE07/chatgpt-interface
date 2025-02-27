import axios from "axios";

const API_KEY = "AIzaSyCikh23Vk3YuSqgh2fEnuqrknvQEzsXUhs"; // Replace with your Gemini API key
const BASE_URL =
  "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent"; // Correct API URL

export const fetchChatResponse = async (userMessage) => {
  try {
    const response = await axios.post(
      `${BASE_URL}?key=${API_KEY}`,
      {
        contents: [{ parts: [{ text: userMessage }] }],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return (
      response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response."
    );
  } catch (error) {
    console.error("Error fetching response:", error);
    return "Error fetching response.";
  }
};
