const UserRewardModel = require("../models/mongodb/UserReward");
const { GraphQLError } = require("graphql");

// Tạo phần thưởng cho người dùng
const createUserReward = async (input) => {
  try {
    const reward = await UserRewardModel.create(input);
    return reward;
  } catch (error) {
    throw new GraphQLError("Không thể tạo phần thưởng");
  }
};

// Lấy danh sách phần thưởng của người dùng
const getRewardsByUser = async (userId) => {
  try {
    const rewards = await UserRewardModel.find({ userId });
    return rewards;
  } catch (error) {
    throw new GraphQLError("Không thể lấy danh sách phần thưởng");
  }
};

// Nhận phần thưởng (cập nhật trạng thái)
const claimReward = async (rewardId) => {
  try {
    const reward = await UserRewardModel.findById(rewardId);
    if (!reward) throw new GraphQLError("Không tìm thấy phần thưởng");

    if (reward.status === "claimed") {
      throw new GraphQLError("Phần thưởng đã được nhận rồi!");
    }

    reward.status = "claimed";
    reward.claimedAt = new Date();
    await reward.save();

    return reward;
  } catch (error) {
    throw new GraphQLError(error.message || "Không thể nhận thưởng");
  }
};

// Xoá phần thưởng
const deleteReward = async (id) => {
  try {
    const deleted = await UserRewardModel.findByIdAndDelete(id);
    return !!deleted;
  } catch (error) {
    throw new GraphQLError("Không thể xoá phần thưởng");
  }
};

// Lấy thống kê số phần thưởng đã nhận
const getRewardStats = async (userId) => {
  try {
    const [claimed, total] = await Promise.all([
      UserRewardModel.countDocuments({ userId, status: "claimed" }),
      UserRewardModel.countDocuments({ userId }),
    ]);

    return {
      claimed,
      total,
      percent: total > 0 ? Math.round((claimed / total) * 100) : 0,
    };
  } catch (error) {
    throw new GraphQLError("Không thể thống kê phần thưởng");
  }
};

module.exports = {
  createUserReward,
  getRewardsByUser,
  claimReward,
  deleteReward,
  getRewardStats,
};
