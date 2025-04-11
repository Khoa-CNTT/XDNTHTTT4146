const { v4: uuidv4 } = require("uuid");
const Course = require("../models/mysql/Course");
const { Op } = require("sequelize");

// Custom Error
class CourseError extends Error {
  constructor(message, code = "COURSE_ERROR") {
    super(message);
    this.name = "CourseError";
    this.code = code;
  }
}

/**
 * Tạo khoá học mới
 * @param {{ name: string, description?: string, price: number, image?: string }} input
 */
async function createCourse({ name, description = "", price, image = null }) {
  if (!name || !price) {
    throw new CourseError("Tên và giá khoá học là bắt buộc!", "INVALID_INPUT");
  }

  const course = await Course.create({
    id: uuidv4(),
    name,
    description,
    price,
    image,
  });

  return course;
}

/**
 * Cập nhật khoá học
 * @param {UUID} courseId
 * @param {{ name?: string, description?: string, price?: number, image?: string, status?: string }} updateData
 */
async function updateCourse(courseId, updateData) {
  const course = await Course.findByPk(courseId);
  if (!course) throw new CourseError("Khoá học không tồn tại!", "NOT_FOUND");

  await course.update(updateData);
  return course;
}

/**
 * Xoá mềm khoá học
 * @param {UUID} courseId
 */
async function softDeleteCourse(courseId) {
  const course = await Course.findByPk(courseId);
  if (!course) throw new CourseError("Khoá học không tồn tại!", "NOT_FOUND");

  await course.destroy();
  return true;
}

/**
 * Khôi phục khoá học đã xoá
 * @param {UUID} courseId
 */
async function restoreCourse(courseId) {
  const course = await Course.findOne({
    where: { id: courseId },
    paranoid: false,
  });
  if (!course) throw new CourseError("Khoá học không tồn tại!", "NOT_FOUND");

  await course.restore();
  return course;
}

/**
 * Lấy danh sách khoá học
 * @param {object} options - { status, search, limit, offset, includeDeleted }
 */
async function getCourses({
  status = null,
  search = "",
  limit = 20,
  offset = 0,
  includeDeleted = false,
} = {}) {
  const where = {};

  if (status) where.status = status;
  if (search) {
    where.name = {
      [Op.like]: `%${search}%`,
    };
  }

  const courses = await Course.findAndCountAll({
    where,
    limit,
    offset,
    paranoid: !includeDeleted,
    order: [["createdAt", "DESC"]],
  });

  return courses;
}

/**
 * Lấy khoá học theo ID
 * @param {UUID} courseId
 */
async function getCourseById(courseId) {
  const course = await Course.findByPk(courseId);
  if (!course) throw new CourseError("Khoá học không tồn tại!", "NOT_FOUND");
  return course;
}

/**
 * Đổi trạng thái khoá học
 * @param {UUID} courseId
 * @param {"active" | "inactive"} status
 */
async function changeCourseStatus(courseId, status) {
  const course = await Course.findByPk(courseId);
  if (!course) throw new CourseError("Khoá học không tồn tại!", "NOT_FOUND");

  course.status = status;
  await course.save();
  return course;
}

module.exports = {
  createCourse,
  updateCourse,
  softDeleteCourse,
  restoreCourse,
  getCourses,
  getCourseById,
  changeCourseStatus,
  CourseError,
};
