import 'react-native-gesture-handler';

import Amigos from './screens/Amigos'
import Chat from './screens/Chat'
import Login from './screens/Login'
import { NavigationContainer } from '@react-navigation/native';
import Perfil from './screens/Perfil'
import React from 'react';
import Signup from './screens/Signup'
import Welcome from './screens/Welcome'
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login ">
        <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }}/>
        <Stack.Screen name="Signup" component={Signup} options={{ title: 'Signup' }} />
        <Stack.Screen name="Welcome" component={Welcome} options={{ title: 'Welcome' }} />
        <Stack.Screen name="Perfil" component={Perfil} options={{ title: 'Perfil' }} />
        <Stack.Screen name="Amigos" component={Amigos} options={{ title: 'Amigos' }} />
        <Stack.Screen name="Chat" component={Chat} options={{ title: 'Chat' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
