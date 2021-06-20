import "react-native-gesture-handler";

import React, { useState } from "react";

import Amigos from "./screens/Amigos";
import Chat from './screens/Chat'
import GlobalContext from "./components/global/context";
import Login from "./screens/Login";
import { NavigationContainer } from "@react-navigation/native";
import Perfil from "./screens/Perfil";
import Signup from "./screens/Signup";
import Welcome from "./screens/Welcome";
import { createStackNavigator } from "@react-navigation/stack";

export default function App() {

  const [authData, setAuthData] = useState({
    nombre: "Mariano",
    idioma: "España",
    edad: 25,
    cambioPerfil: (nombre, edad, idioma) => {
      setAuthData({ nombre, edad, idioma });
    },
  });

  const [authenticated, setAuthenticated] = useState(false);

  //hacer OpenId Protocol
  function applyAuthentication(googleUser){

  }

  const Stack = createStackNavigator();

  return (
    <GlobalContext.Provider value={{ authData, setAuthenticated }}>
      <NavigationContainer>
        <Stack.Navigator>
          {/* <Stack.Screen
            name="Login"
            component={Login}
            options={{ title: "Login" }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{ title: "Signup" }}
          />
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{ title: "Welcome" }}
          />
          <Stack.Screen
            name="Perfil"
            component={Perfil}
            options={{ title: "Perfil" }}
          />
          <Stack.Screen
            name="Amigos"
            component={Amigos}
            options={{ title: "Amigos" }}
          />
          <Stack.Screen
            name="Chat"
            component={Chat}
            options={{ title: "Chat" }}
          /> */}
          {  
          (authenticated)?
          <>
            <Stack.Screen name="Welcome" component={Welcome} options={{ title: "Welcome" }} />
            <Stack.Screen name="Perfil" component={Perfil} options={{ title: 'Perfil' }} />
            <Stack.Screen name="Amigos" component={Amigos} options={{ title: 'Amigos' }} />
            <Stack.Screen name="Chat" component={Chat} options={{ title: 'Chat' }} />

          </>
          :
          <>
          {/**Pasarle el prop al Login del applyauthentication */}
            <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }} />
            <Stack.Screen name="Signup" component={Signup} options={{ title: 'Signup' }} />
          </>
          }
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalContext.Provider>
  );
}