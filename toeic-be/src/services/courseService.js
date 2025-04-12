const { Course, Lesson } = require("../models");

const CourseService = {
  getAll: async ({ level, isActive, limit, offset }) => {
    const where = {};
    if (level) where.level = level;
    if (typeof isActive === "boolean") where.isActive = isActive;

    return await Course.findAll({
      where,
      include: [{ model: Lesson, as: "lessons" }],
      order: [["createdAt", "DESC"]],
      limit,
      offset,
    });
  },

  getById: async (id) => {
    return await Course.findByPk(id, {
      include: [{ model: Lesson, as: "lessons" }],
    });
  },

  create: async (input) => {
    const existed = await Course.findOne({ where: { name: input.name } });
    if (existed) throw new Error("Tên khoá học đã tồn tại.");
    return await Course.create(input);
  },

  update: async (id, input) => {
    const course = await Course.findByPk(id);
    if (!course) return null;
    await course.update(input);
    return course;
  },

  delete: async (id) => {
    const course = await Course.findByPk(id);
    if (!course) return null;
    await course.destroy();
    return course;
  },
};

module.exports = CourseService;
