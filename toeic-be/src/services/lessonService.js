const { Lesson } = require("../../models/mysql");

const lessonService = {
  async getLessonById(id) {
    return Lesson.findByPk(id);
  },

  async getLessonsByCourse(courseId) {
    return Lesson.findAll({
      where: { courseId },
      order: [["order", "ASC"]],
    });
  },

  async getLessonsByType(type) {
    return Lesson.findAll({ where: { type } });
  },

  async createLesson(data) {
    return Lesson.create(data);
  },

  async updateLesson(id, data) {
    const lesson = await Lesson.findByPk(id);
    if (!lesson) return null;
    await lesson.update(data);
    return lesson;
  },

  async deleteLesson(id) {
    const lesson = await Lesson.findByPk(id);
    if (!lesson) return null;
    await lesson.destroy();
    return lesson;
  },
};

module.exports = lessonService;
