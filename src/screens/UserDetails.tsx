import React, {FunctionComponent, useEffect, useCallback} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from './Profile';
import Repositories from './Repositories';
import {SafeAreaView, StyleSheet} from 'react-native';
import {
  Divider,
  TopNavigation,
  TopNavigationAction,
  Icon,
  StyleType,
} from '@ui-kitten/components';
import {actions} from '../state/userList';
import {useDispatch} from 'react-redux';
import {ScreenProps} from '../types';

const Tab = createBottomTabNavigator();

const BackIcon = (style: StyleType) => <Icon {...style} name="arrow-back" />;

const UserDetails: FunctionComponent<ScreenProps> = ({route, navigation}) => {
  const {user} = route.params;

  const dispatch = useDispatch();

  const navigateBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      // reset store userProfile and userRepos
      dispatch(actions.user.reset());
    });
    return unsubscribe;
  }, [navigation, dispatch]);

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );
  return (
    <SafeAreaView style={{flex: 1}}>
      <TopNavigation
        title={user.login}
        alignment="center"
        leftControl={BackAction()}
      />
      <Divider />
      <Tab.Navigator
        tabBarOptions={{
          labelStyle: styles.labelStyle,
        }}>
        <Tab.Screen name="Profile" component={Profile} initialParams={{user}} />
        <Tab.Screen
          name="Repositories"
          component={Repositories}
          initialParams={{user}}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  labelStyle: {fontSize: 16},
});

export default UserDetails;
