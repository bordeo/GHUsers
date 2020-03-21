export type User = {
  name: string;
  surname: string;
  age: number;
};

export type UserListState = {
  users: User[];
  refreshing: boolean;
  error: null | string;
};

export type UserListRequestAction = {
  type: string;
};
export type UserListFailureAction = {
  type: string;
};
export type UserListSuccessAction = {
  type: string;
};

export type UserListAction =
  | UserListRequestAction
  | UserListFailureAction
  | UserListSuccessAction;

export type AppState = {
  userList: UserListState;
};
