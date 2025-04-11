const VocabularyGardenModel = require("../models/mongodb/VocabularyGarden");
const { GraphQLError } = require("graphql");

// Tạo mới một bản ghi VocabularyGarden
const createVocabularyGarden = async (input) => {
  try {
    const existing = await VocabularyGardenModel.findOne({
      userId: input.userId,
      vocabularyId: input.vocabularyId,
    });

    if (existing) {
      throw new GraphQLError("Từ vựng này đã có trong vườn rồi!");
    }

    const newEntry = await VocabularyGardenModel.create(input);
    return newEntry;
  } catch (error) {
    throw new GraphQLError(error.message || "Tạo dữ liệu không thành công");
  }
};

// Cập nhật trạng thái học của một từ vựng
const updateVocabularyGarden = async (input) => {
  try {
    const updated = await VocabularyGardenModel.findByIdAndUpdate(
      input.id,
      { status: input.status, updatedAt: new Date() },
      { new: true }
    );

    if (!updated) {
      throw new GraphQLError("Không tìm thấy từ vựng để cập nhật");
    }

    return updated;
  } catch (error) {
    throw new GraphQLError(error.message || "Cập nhật thất bại");
  }
};

// Xoá một từ vựng khỏi garden
const deleteVocabularyGarden = async (id) => {
  try {
    const result = await VocabularyGardenModel.findByIdAndDelete(id);
    return !!result;
  } catch (error) {
    throw new GraphQLError(error.message || "Xóa thất bại");
  }
};

// Lấy tất cả từ vựng theo user
const getVocabularyGardenByUser = async (userId) => {
  try {
    const list = await VocabularyGardenModel.find({ userId });

    // Tự động đánh dấu "wilted" nếu đã quá 7 ngày không học
    const now = new Date();
    const updatedList = await Promise.all(
      list.map(async (entry) => {
        const lastUpdate = new Date(entry.updatedAt);
        const diffDays = Math.floor((now - lastUpdate) / (1000 * 60 * 60 * 24));

        if (
          entry.status === "bloomed" &&
          diffDays >= 7 &&
          entry.status !== "wilted"
        ) {
          entry.status = "wilted";
          entry.updatedAt = now;
          await entry.save();
        }

        return entry;
      })
    );

    return updatedList;
  } catch (error) {
    throw new GraphQLError("Không thể lấy dữ liệu Vocabulary Garden");
  }
};

// Lấy chi tiết 1 bản ghi theo ID
const getVocabularyGardenEntry = async (id) => {
  try {
    const entry = await VocabularyGardenModel.findById(id);
    if (!entry) throw new GraphQLError("Không tìm thấy bản ghi");
    return entry;
  } catch (error) {
    throw new GraphQLError(error.message || "Lỗi lấy dữ liệu");
  }
};

// Tính tiến độ học từ vựng
const getVocabularyProgress = async (userId) => {
  try {
    const [total, learned] = await Promise.all([
      VocabularyGardenModel.countDocuments({ userId }),
      VocabularyGardenModel.countDocuments({ userId, status: "bloomed" }),
    ]);

    const percent = total > 0 ? Math.round((learned / total) * 100) : 0;

    return { total, learned, percent };
  } catch (error) {
    throw new GraphQLError("Không thể tính tiến trình học từ vựng");
  }
};

module.exports = {
  createVocabularyGarden,
  updateVocabularyGarden,
  deleteVocabularyGarden,
  getVocabularyGardenByUser,
  getVocabularyGardenEntry,
  getVocabularyProgress,
};
