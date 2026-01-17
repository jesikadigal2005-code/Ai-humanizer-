import express from "express";
import OpenAI from "openai";
import rateLimiter from "../middleware/rateLimit.js";
import buildPrompt from "./utils/promptBuilder.js";

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// 🔐 API KEY CHECK (for your APK)
router.use((req, res, next) => {
  if (req.headers["x-api-key"] !== process.env.APP_API_KEY) {
    return res.status(403).json({ error: "Invalid API key" });
  }
  next();
});

router.post("/humanize", rateLimiter, async (req, res) => {
  try {
    const { text, tone } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    const prompt = buildPrompt(text, tone);

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.9
    });

    res.json({
      success: true,
      output: response.choices[0].message.content
    });

  } catch (err) {
    res.status(500).json({ error: "Humanization failed" });
  }
});

export default router;
