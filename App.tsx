import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Users from './src/screens/Users';
import UserDetails from './src/screens/UserDetails';

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Users"
          component={Users}
          options={{title: 'Users'}}
        />
        <Stack.Screen
          name="UserDetails"
          component={UserDetails}
          options={({route}) => ({title: route.params.name})}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
