import { gql } from "@apollo/client";
import client from "./apolloClient";

// **Đăng ký người dùng**
const REGISTER_MUTATION = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      status
      msg
    }
  }
`;

export const registerUser = async ({ name, email, password }) => {
  return client.mutate({
    mutation: REGISTER_MUTATION,
    variables: {
      input: { name, email, password, roleId: "student" },
    },
  });
};

// **Đăng nhập người dùng**
const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      status
      msg
      token
    }
  }
`;

export const loginUser = async (formData) => {
  return client.mutate({
    mutation: LOGIN_MUTATION,
    variables: formData,
  });
};

// **Đăng nhập với Google**
const GOOGLE_LOGIN_MUTATION = gql`
  mutation GoogleLogin($idToken: String!) {
    googleLogin(idToken: $idToken) {
      status
      msg
      token
    }
  }
`;

export const loginWithGoogle = async (idToken) => {
  return client.mutate({
    mutation: GOOGLE_LOGIN_MUTATION,
    variables: { idToken },
  });
};

// **Quên mật khẩu (Gửi email để reset mật khẩu)**
const FORGOT_PASSWORD_MUTATION = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email) {
      status
      msg
    }
  }
`;

export const forgotPassword = async (email) => {
  return client.mutate({
    mutation: FORGOT_PASSWORD_MUTATION,
    variables: { email },
  });
};

// **Đổi mật khẩu**
const CHANGE_PASSWORD_MUTATION = gql`
  mutation ChangePassword($currentPassword: String!, $newPassword: String!) {
    changePassword(
      currentPassword: $currentPassword
      newPassword: $newPassword
    ) {
      status
      msg
    }
  }
`;

export const changePassword = async (currentPassword, newPassword) => {
  return client.mutate({
    mutation: CHANGE_PASSWORD_MUTATION,
    variables: { currentPassword, newPassword },
  });
};

// **Đăng xuất**
export const logoutUser = () => {
  localStorage.removeItem("authToken");
  window.location.href = "/login";
};

export const GET_USER_PROGRESS = gql`
  query GetUserProgress($userId: ID!) {
    getUserProgress(userId: $userId) {
      totalLessonsCompleted
      currentCourseId
      garden {
        seedsPlanted
        vocabularyLearned
      }
    }
  }
`;

export const GET_USER_REWARDS = gql`
  query GetUserRewards($userId: ID!) {
    getUserRewards(userId: $userId) {
      coins
      exp
      badges {
        name
        description
        icon
      }
    }
  }
`;

export const GET_LEADERBOARD = gql`
  query GetLeaderboard {
    getLeaderboard {
      userId
      fullName
      exp
      rank
    }
  }
`;
