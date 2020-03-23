import {NetworkState} from 'react-native-offline/dist/src/types';

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
  error: undefined | {message: string};
  totalCount: number;
  next: undefined | {page: number};
};

export type AppState = {
  users: UsersState;
  network: NetworkState;
};
