const { Question } = require("../models/mysql");
const { GraphQLError } = require("graphql");

// Tạo câu hỏi mới cho đề thi thử
const createQuestion = async (input) => {
  try {
    const created = await Question.create(input);
    return created;
  } catch (error) {
    throw new GraphQLError(error.message || "Không thể tạo câu hỏi");
  }
};

// Cập nhật thông tin câu hỏi
const updateQuestion = async (id, updates) => {
  try {
    const [affectedRows] = await Question.update(updates, { where: { id } });
    if (affectedRows === 0) {
      throw new GraphQLError("Không tìm thấy câu hỏi để cập nhật");
    }

    const updated = await Question.findByPk(id);
    return updated;
  } catch (error) {
    throw new GraphQLError(error.message || "Cập nhật câu hỏi thất bại");
  }
};

// Xoá câu hỏi
const deleteQuestion = async (id) => {
  try {
    const deleted = await Question.destroy({ where: { id } });
    return !!deleted;
  } catch (error) {
    throw new GraphQLError(error.message || "Xoá câu hỏi thất bại");
  }
};

// Lấy toàn bộ câu hỏi theo đề thi
const getQuestionsByMockTest = async (mockTestId) => {
  try {
    const list = await Question.findAll({
      where: { mock_test_id: mockTestId },
      order: [["createdAt", "ASC"]],
    });
    return list;
  } catch (error) {
    throw new GraphQLError("Không thể lấy danh sách câu hỏi theo đề thi");
  }
};

// Lấy chi tiết 1 câu hỏi
const getQuestionById = async (id) => {
  try {
    const question = await Question.findByPk(id);
    if (!question) throw new GraphQLError("Không tìm thấy câu hỏi");
    return question;
  } catch (error) {
    throw new GraphQLError(error.message || "Không thể lấy câu hỏi");
  }
};

// Lấy danh sách câu hỏi theo Part (tuỳ chọn lọc thêm theo đề)
const getQuestionsByPart = async (part, mockTestId = null) => {
  try {
    const whereClause = mockTestId
      ? { part, mock_test_id: mockTestId }
      : { part };
    const list = await Question.findAll({
      where: whereClause,
      order: [["createdAt", "ASC"]],
    });
    return list;
  } catch (error) {
    throw new GraphQLError("Không thể lấy câu hỏi theo Part");
  }
};

module.exports = {
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestionsByMockTest,
  getQuestionById,
  getQuestionsByPart,
};
