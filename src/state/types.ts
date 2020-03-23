export type User = {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
};

export type UserProfile = User & {
  name: string;
  company: string;
  blog: string;
  location: string;
  email: null | string;
};

export type Repo = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
};

export type UsersState = {
  users: User[];
  userProfile: null | UserProfile;
  userRepos: null | Repo[];
  refreshing: boolean;
  error: null | string;
  totalCount: null | number;
  next: null | {};
};

export type AppState = {
  users: UsersState;
};
