const { Question, Answer } = require("../models"); // MySQL
const UserProgress = require("../modelsMongo/UserProgress"); // MongoDB
const { Op } = require("sequelize");

/**
 * Lấy danh sách câu hỏi luyện tập theo part và cấp độ
 * @param {number} part - Part của đề TOEIC (1–7)
 * @param {string} level - Mức độ (beginner, intermediate, expert, ...)
 * @param {number} limit - Số lượng câu hỏi muốn lấy
 */
const getPracticeQuestions = async ({ part, level, limit = 10 }) => {
  const questions = await Question.findAll({
    where: {
      part,
      level,
    },
    include: [
      {
        model: Answer,
        as: "answers",
        attributes: { exclude: ["isCorrect"] }, // Ẩn đáp án đúng
      },
    ],
    order: [["createdAt", "DESC"]],
    limit,
  });

  return questions;
};

/**
 * Chấm điểm bài luyện tập
 * @param {string} userId - ID người dùng
 * @param {Array} responses - Mảng các câu trả lời: [{ questionId, answerId }]
 */
const submitPractice = async (userId, responses) => {
  let score = 0;
  const results = [];

  for (const response of responses) {
    const question = await Question.findByPk(response.questionId, {
      include: [{ model: Answer, as: "answers" }],
    });

    if (!question) continue;

    const correctAnswer = question.answers.find((ans) => ans.isCorrect);
    const isCorrect = correctAnswer?.id === response.answerId;
    if (isCorrect) score += 5;

    results.push({
      questionId: question.id,
      isCorrect,
      correctAnswerId: correctAnswer?.id,
      selectedAnswerId: response.answerId,
    });
  }

  // Lưu tiến trình vào MongoDB
  await UserProgress.updateOne(
    { userId },
    {
      $push: {
        practiceHistory: {
          date: new Date(),
          score,
          total: responses.length,
          details: results,
        },
      },
    },
    { upsert: true }
  );

  return {
    score,
    totalQuestions: responses.length,
    correct: results.filter((r) => r.isCorrect).length,
    details: results,
  };
};

module.exports = {
  getPracticeQuestions,
  submitPractice,
};
