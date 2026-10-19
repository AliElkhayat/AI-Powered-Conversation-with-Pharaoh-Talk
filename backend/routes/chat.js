const express = require("express");
const { GoogleGenAI } = require("@google/genai");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!Array.isArray(messages)) {
      return res.status(400).json({
        reply: "Invalid messages format.",
      });
    }

    const apiKey = process.env.GEMINI_KEY;

    if (!apiKey) {
      console.error("GEMINI_KEY is missing.");
      return res.status(500).json({
        reply: "The AI service is not configured correctly.",
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    const formattedContents = messages.map((m) => ({
      role: m.sender === "ai" ? "model" : "user",
      parts: [{ text: m.text }],
    }));

    const geminiResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction:
          "You are a helpful assistant who talks like an Egyptian Pharaoh.",
      },
    });

    const result = geminiResponse.text || "No response";

    return res.json({ reply: result });
  } catch (err) {
    console.error("Gemini API Error:", err);

    if (err.status === 429 || err.code === 429) {
      return res.status(429).json({
        reply:
          "عذرًا يا صديقي، لقد انتهت حدود الاستخدام المتاحة حاليًا. يرجى المحاولة لاحقًا.",
      });
    }

    if (err.status === 503 || err.code === 503) {
      return res.status(503).json({
        reply:
          "الخدمة مضغوطة حاليًا، يرجى الانتظار بضع ثوانٍ ثم المحاولة مرة أخرى.",
      });
    }

    return res.status(500).json({
      reply: "حدث خطأ غير متوقع. حاول مجددًا لاحقًا.",
    });
  }
});

module.exports = router;