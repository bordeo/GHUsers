import 'react-native-gesture-handler';
import React, {FunctionComponent} from 'react';
import {StatusBar} from 'react-native';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {mapping, light as lightTheme} from '@eva-design/eva';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Users from './screens/Users';
import UserDetails from './screens/UserDetails';
import store from './state/store';
import {Provider} from 'react-redux';
import {RootStackParamList} from './types';
import {ReduxNetworkProvider} from 'react-native-offline';
import OfflineIndicator from './components/OfflineIndicator';

const Stack = createStackNavigator<RootStackParamList>();

const App: FunctionComponent = () => {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Provider store={store}>
        <ReduxNetworkProvider>
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
            <OfflineIndicator />
          </ApplicationProvider>
        </ReduxNetworkProvider>
      </Provider>
    </>
  );
};

export default App;
