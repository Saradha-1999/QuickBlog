// gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

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
    console.error("❌ Gemini Error:", err);
    return null;
  }
}
