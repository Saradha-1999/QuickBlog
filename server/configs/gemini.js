import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("❌ GEMINI_API_KEY not set in environment variables.");
}

const ai = new GoogleGenerativeAI(API_KEY);

export async function generateGeminiContent(prompt) {
  try {
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }]
        }
      ]
    });

    const response = await result.response;
    const text = await response.text();
    return text;
  } catch (err) {
    console.error("❌ Gemini Error:", err.message || err);
    return null;
  }
}
