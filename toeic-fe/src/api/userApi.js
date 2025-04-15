<<<<<<< HEAD
import { gql, useMutation, useQuery } from "@apollo/client";

// ✅ Queries
export const GET_USER_PROFILE = gql`
  query GetUserProfile {
    getUserProfile {
      id
      fullName
      email
      role
      avatar
      isActive
      createdAt
    }
  }
`;

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      id
      fullName
      email
      role
      isActive
      createdAt
    }
  }
`;

// ✅ Mutations
export const REGISTER_USER = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      token
      user {
        id
        fullName
        email
        role
      }
=======
import { gql } from "@apollo/client";
import client from "./apolloClient";

// **Đăng ký người dùng**
const REGISTER_MUTATION = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      status
      msg
>>>>>>> 3fd30cc8a5683af940d62d4b1b41ce5ccd11fc34
    }
  }
`;

<<<<<<< HEAD
export const LOGIN_USER = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        id
        fullName
        email
        role
      }
=======
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
>>>>>>> 3fd30cc8a5683af940d62d4b1b41ce5ccd11fc34
    }
  }
`;

<<<<<<< HEAD
export const GOOGLE_LOGIN = gql`
  mutation GoogleLogin($idToken: String!) {
    googleLogin(idToken: $idToken) {
      token
      user {
        id
        fullName
        email
        role
      }
=======
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
>>>>>>> 3fd30cc8a5683af940d62d4b1b41ce5ccd11fc34
    }
  }
`;

<<<<<<< HEAD
export const FORGOT_PASSWORD = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;

export const RESET_PASSWORD = gql`
  mutation ResetPassword($token: String!, $newPassword: String!) {
    resetPassword(token: $token, newPassword: $newPassword)
  }
`;

export const UPDATE_USER_STATUS = gql`
  mutation UpdateUserStatus($userId: ID!, $isActive: Boolean!) {
    updateUserStatus(userId: $userId, isActive: $isActive) {
      id
      isActive
    }
  }
`;

export const SOFT_DELETE_USER = gql`
  mutation SoftDeleteUser($userId: ID!) {
    softDeleteUser(userId: $userId) {
      id
      isDeleted
    }
  }
`;

export const LOGOUT_USER = gql`
  mutation Logout {
    logout
  }
`;

// Các mutation / query mở rộng liên quan tới gamification, tiến độ học, phần thưởng, v.v.
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

export function useUserProfile() {
  return useQuery(GET_USER_PROFILE, {
    fetchPolicy: "cache-and-network",
  });
}

export function useAllUsers() {
  return useQuery(GET_ALL_USERS);
}
=======
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
>>>>>>> 3fd30cc8a5683af940d62d4b1b41ce5ccd11fc34
