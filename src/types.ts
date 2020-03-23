import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp, CompositeNavigationProp} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {User} from './state/types';

export type RootStackParamList = {
  Users: undefined;
  UserDetails: {name: string; user: User};
};

export type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Users' | 'UserDetails'
>;

export type ScreenRouteProp = RouteProp<
  RootStackParamList,
  'Users' | 'UserDetails'
>;

export type ScreenProps = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

export type UserDetailsTabParamList = {
  Profile: {user: User};
  Repositories: {user: User};
};

export type UserDetailsScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<UserDetailsTabParamList, 'Profile' | 'Repositories'>,
  StackNavigationProp<RootStackParamList>
>;

export type UserDetailsScreenRouteProp = RouteProp<
  UserDetailsTabParamList,
  'Profile' | 'Repositories'
>;

export type UserDetailsScreenProps = {
  navigation: UserDetailsScreenNavigationProp;
  route: UserDetailsScreenRouteProp;
};
