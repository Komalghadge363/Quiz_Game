import express from "express";
const router = express.Router();

router.get("/stats", (req, res) => {
  res.json({ users: 10, quizzes: 120 });
});

export default router;
