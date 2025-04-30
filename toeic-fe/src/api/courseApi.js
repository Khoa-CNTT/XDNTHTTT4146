import { gql } from "@apollo/client";
import client from "./apolloClient";

// Query to fetch all courses
const GET_COURSES = gql`
  query GetCourses {
    courses {
      id
      title
      description
    }
  }
`;

// Query to fetch a course by ID
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
      }
    }
  }
`;

// Mutation to delete a course
const DELETE_COURSE = gql`
  mutation DeleteCourse($id: ID!) {
    deleteCourse(id: $id) {
      success
      message
    }
  }
`;

// Fetch all courses
export const getCourses = async () => {
  try {
    const response = await client.query({ query: GET_COURSES });
    return response.data.courses;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

// Delete a specific course by ID
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

// Fetch course details by ID
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
