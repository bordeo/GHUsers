import React, {useEffect, useCallback} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from './Profile';
import Repositories from './Repositories';
import {SafeAreaView} from 'react-native';
import {
  Divider,
  TopNavigation,
  TopNavigationAction,
  Icon,
} from '@ui-kitten/components';
import {useActions} from '../hooks/useActions';
import actions from '../state/userList';
import {useDispatch} from 'react-redux';

const Tab = createBottomTabNavigator();

const BackIcon = style => <Icon {...style} name="arrow-back" />;

const UserDetails = ({route, navigation}) => {
  const {user} = route.params;

  const dispatch = useDispatch();

  const navigateBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      // reset store userProfile userRepos
      dispatch({type: 'USER/RESET'});
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
      <Tab.Navigator>
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

export default UserDetails;
