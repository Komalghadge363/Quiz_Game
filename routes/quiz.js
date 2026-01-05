import express from "express";
import { generateMockQuestions } from "../services/openai.js";

const router = express.Router();

router.get("/generate", (req, res) => {
  const { topic, difficulty, count } = req.query;

  const questions = generateMockQuestions({
    topic,
    difficulty,
    count: Number(count) || 10
  });

  res.json({
    success: true,
    total: questions.length,
    questions
  });
});

export default router;
