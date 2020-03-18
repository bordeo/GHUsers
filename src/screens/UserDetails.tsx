import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from './Profile';
import Repositories from './Repositories';

const Tab = createBottomTabNavigator();

const UserDetails = ({route, navigation}) => {
  const {user} = route.params;
  console.log(user);
  return (
    <Tab.Navigator>
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Repositories" component={Repositories} />
    </Tab.Navigator>
  );
};

export default UserDetails;
