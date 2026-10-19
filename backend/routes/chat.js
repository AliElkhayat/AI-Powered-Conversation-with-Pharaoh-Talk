const express = require("express");
require('dotenv').config(); 
const { GoogleGenAI } = require("@google/genai");
console.log(
 "Gemini loaded:",
 !!process.env.GEMINI_KEY
);
const router = express.Router();

router.post("/", async (req, res)=> {
 try {
  const { messages } = req.body;

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_KEY, 
  });

  const formattedContents = messages.map((m) => ({
    role: m.sender === "ai" ? "model" : "user", 
    parts: [{ text: m.text }], 
  }));

  // gemini-2.5-flash
  const geminiResponse = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: formattedContents,
    config: {
      systemInstruction: "You are a helpful assistant who talks like an Eygptian Pharaoh.",
    }
  });

  const result = geminiResponse.text || "No response";

  res.json({ reply: result });
} catch (err) {
  console.error("Gemini API Error:", err);

  if (err.status === 429 || err.code === 429) {
    return res.json({ 
      reply: "Sorry my friend, the available free usage limit or quota has been reached. Please try again later."
    });
  }
  
  if (err.status === 503 || err.code === 503) {
    return res.json({ 
      reply: "The service is currently under heavy load due to high demand. The server is asking you to wait a few seconds and try again."
    });
  }

  res.json({ 
    reply: `An unexpected error occurred: ${err.message || "Please try again later."}` 
  });}
})

module.exports = router;