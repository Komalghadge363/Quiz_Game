// services/openai.js

const usedQuestions = new Set();

const questionTemplates = [
  {
    type: "single",
    template: () => ({
      question: "What is the capital of India?",
      options: ["Delhi", "Mumbai", "Chennai", "Kolkata"],
      answer: ["Delhi"]
    })
  },
  {
    type: "single",
    template: () => ({
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Venus"],
      answer: ["Mars"]
    })
  },
  {
    type: "multi",
    template: () => ({
      question: "Which are programming languages?",
      options: ["Python", "HTML", "Java", "CSS"],
      answer: ["Python", "Java"]
    })
  },
  {
    type: "fill",
    template: () => ({
      question: "_____ is used to style web pages.",
      answer: ["CSS"]
    })
  },
  {
    type: "fill",
    template: () => ({
      question: "JavaScript runs inside the _____ browser.",
      answer: ["web"]
    })
  }
];

// Shuffle helper
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

export const generateMockQuestions = ({
  topic = "General",
  difficulty = "medium",
  count = 10
}) => {
  const questions = [];
  let attempts = 0;

  while (questions.length < count && attempts < 100) {
    attempts++;

    const randomTemplate =
      questionTemplates[Math.floor(Math.random() * questionTemplates.length)];

    const q = randomTemplate.template();
    const key = q.question.toLowerCase();

    if (!usedQuestions.has(key)) {
      usedQuestions.add(key);

      questions.push({
        id: usedQuestions.size,
        topic,
        difficulty,
        type: randomTemplate.type,
        ...q
      });
    }
  }

  return shuffle(questions);
};
