// src/utils/geminiService.js
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini with your API key from .env
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// System prompt to guide Gemini’s behavior
const SYSTEM_PROMPT = `
You are SkillPath AI Assistant, a helpful educational chatbot for a learning platform. You help users with:
- Course recommendations and learning paths
- Assessment guidance and preparation
- Career advice and skill development
- Technical questions about programming and technologies
- Platform features and navigation

Keep responses concise, helpful, and encouraging. Use emojis where helpful.
`;

// Chat session to be reused across requests
let chatSession;

export const initGeminiChat = async () => {
  if (!chatSession) {
    // ✅ Use Gemini 2.0 Flash here
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    chatSession = await model.startChat({
      systemInstruction: {
        role: "system",
        parts: [{ text: SYSTEM_PROMPT }],
      },
    });
  }
};

// Helper to retry Gemini sendMessage on 429 errors
async function sendMessageWithRetry(userInput, retries = 3, backoff = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      const result = await chatSession.sendMessage(userInput);
      const response = await result.response;
      return response.text();
    } catch (error) {
      // Check for 429 Too Many Requests
      if (error && error.status === 429) {
        if (i < retries - 1) {
          // Wait before retrying
          await new Promise(res => setTimeout(res, backoff * (i + 1)));
          continue;
        } else {
          // All retries failed
          return "⚠️ Too many requests to Gemini AI. Please wait a moment and try again.";
        }
      } else {
        // Not a 429 error, rethrow
        throw error;
      }
    }
  }
}

export const getGeminiResponse = async (userInput) => {
  try {
    await initGeminiChat(); // ensure session is ready
    // Use retry logic for sendMessage
    return await sendMessageWithRetry(userInput);
  } catch (error) {
    console.error("Gemini API error:", error);
    return "⚠️ I'm having trouble accessing Gemini AI right now. Please try again later!";
  }
};
