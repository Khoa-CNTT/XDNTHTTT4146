const { CourseUser, User, Course } = require("../models");

const CourseUserService = {
  enroll: async ({ userId, courseId }) => {
    const existed = await CourseUser.findOne({ where: { userId, courseId } });
    if (existed) throw new Error("Bạn đã đăng ký khóa học này rồi.");
    return await CourseUser.create({ userId, courseId });
  },

  getByUser: async (userId) => {
    return await CourseUser.findAll({
      where: { userId },
      include: [{ model: Course, as: "course" }],
      order: [["enrolledAt", "DESC"]],
    });
  },

  getByCourse: async (courseId) => {
    return await CourseUser.findAll({
      where: { courseId },
      include: [{ model: User, as: "user" }],
    });
  },

  update: async (id, input) => {
    const cu = await CourseUser.findByPk(id);
    if (!cu) return null;
    await cu.update(input);
    return cu;
  },
};

module.exports = CourseUserService;
