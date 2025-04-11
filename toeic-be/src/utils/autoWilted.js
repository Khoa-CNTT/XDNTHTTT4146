const VocabularyGarden = require("../../models/mongodb/VocabularyGarden");

const markWiltedWords = async () => {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const result = await VocabularyGarden.updateMany(
    {
      status: { $in: ["seed", "growing", "bloomed"] },
      lastReviewedAt: { $lt: sevenDaysAgo },
    },
    {
      status: "wilted",
    }
  );
  console.log(`[Wilted] ${result.modifiedCount} từ vựng đã bị héo.`);
};

module.exports = { markWiltedWords };
