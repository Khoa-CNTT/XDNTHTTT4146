import { gql } from "@apollo/client";
import client from "./apolloClient";

const GET_COURSES = gql`
  query GetCourses {
    courses {
      id
      title
      description
    }
  }
`;

const DELETE_COURSE = gql`
  mutation DeleteCourse($id: ID!) {
    deleteCourse(id: $id) {
      success
      message
    }
  }
`;

export const getAllCourses = async () => {
  return client.query({ query: GET_COURSES });
};

export const deleteCourse = async (id) => {
  return client.mutate({ mutation: DELETE_COURSE, variables: { id } });
};
