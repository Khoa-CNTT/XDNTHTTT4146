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
    }
  }
`;

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
    }
  }
`;

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
    }
  }
`;

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
