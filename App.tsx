import 'react-native-gesture-handler';
import React from 'react';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {mapping, light as lightTheme} from '@eva-design/eva';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Users from './src/screens/Users';
import UserDetails from './src/screens/UserDetails';
import store from './src/state/store';
import {Provider} from 'react-redux';

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <Provider store={store}>
        <ApplicationProvider mapping={mapping} theme={lightTheme}>
          <NavigationContainer>
            <Stack.Navigator headerMode="none">
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
        </ApplicationProvider>
      </Provider>
    </>
  );
};

export default App;
