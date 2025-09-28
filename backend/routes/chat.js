const express = require("express");
const OpenAI = require("openai");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { messages } = req.body;

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_KEY,
    });

    const gptResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini", 
      messages: [
        { role: "system", content: "You are a helpful assistant who talks like an Eygptian Pharaoh." },
        ...messages.map((m) => ({
          role: m.sender === "ai" ? "assistant" : "user",
          content: m.text,
        })),
      ],
    });

    const result = gptResponse.choices[0].message?.content || "No response";

    res.json({ reply: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 
