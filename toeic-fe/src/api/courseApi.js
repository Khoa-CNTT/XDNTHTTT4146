import { gql } from "@apollo/client";
import client from "./apolloClient";

// =================== 📚 COURSE QUERIES ===================

// Lấy tất cả khoá học
const GET_COURSES = gql`
  query GetCourses {
    courses {
      id
      title
      description
      status
    }
  }
`;

// Lấy chi tiết khoá học theo ID
const GET_COURSE_BY_ID = gql`
  query GetCourseById($id: ID!) {
    course(id: $id) {
      id
      title
      description
      status
      lessons {
        id
        title
        content
      }
    }
  }
`;

// =================== ✏️ COURSE MUTATIONS ===================

// Xoá khoá học
const DELETE_COURSE = gql`
  mutation DeleteCourse($id: ID!) {
    deleteCourse(id: $id) {
      success
      message
    }
  }
`;

// Tạo khoá học mới
const CREATE_COURSE = gql`
  mutation CreateCourse($input: CreateCourseInput!) {
    createCourse(input: $input) {
      id
      title
      description
      status
    }
  }
`;

// Cập nhật khoá học
const UPDATE_COURSE = gql`
  mutation UpdateCourse($id: ID!, $input: UpdateCourseInput!) {
    updateCourse(id: $id, input: $input) {
      id
      title
      description
      status
    }
  }
`;

// Đăng khoá học (nếu có trạng thái "draft" → "published")
const PUBLISH_COURSE = gql`
  mutation PublishCourse($id: ID!) {
    publishCourse(id: $id) {
      success
      message
    }
  }
`;

// =================== 📦 FUNCTIONS ===================

// Lấy danh sách khoá học
export const getCourses = async () => {
  try {
    const response = await client.query({ query: GET_COURSES });
    return response.data.courses;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

// Lấy chi tiết khoá học
export const getCourseById = async (id) => {
  try {
    const response = await client.query({
      query: GET_COURSE_BY_ID,
      variables: { id },
    });
    return response.data.course;
  } catch (error) {
    console.error("Error fetching course by ID:", error);
    throw error;
  }
};

// Xoá khoá học
export const deleteCourse = async (id) => {
  try {
    const response = await client.mutate({
      mutation: DELETE_COURSE,
      variables: { id },
    });
    return response.data.deleteCourse;
  } catch (error) {
    console.error("Error deleting course:", error);
    throw error;
  }
};

// Tạo mới khoá học
export const createCourse = async (input) => {
  try {
    const response = await client.mutate({
      mutation: CREATE_COURSE,
      variables: { input },
    });
    return response.data.createCourse;
  } catch (error) {
    console.error("Error creating course:", error);
    throw error;
  }
};

// Cập nhật khoá học
export const updateCourse = async (id, input) => {
  try {
    const response = await client.mutate({
      mutation: UPDATE_COURSE,
      variables: { id, input },
    });
    return response.data.updateCourse;
  } catch (error) {
    console.error("Error updating course:", error);
    throw error;
  }
};

// Đăng khoá học
export const publishCourse = async (id) => {
  try {
    const response = await client.mutate({
      mutation: PUBLISH_COURSE,
      variables: { id },
    });
    return response.data.publishCourse;
  } catch (error) {
    console.error("Error publishing course:", error);
    throw error;
  }
};
