import "react-native-gesture-handler";

import Amigos from "./screens/Amigos";
import Login from "./screens/Login";
import { NavigationContainer } from "@react-navigation/native";
import Perfil from "./screens/Perfil";
import React, { useState } from "react";
import Signup from "./screens/Signup";
import Welcome from "./screens/Welcome";
import { createStackNavigator } from "@react-navigation/stack";
import GlobalContext from "./components/global/context";

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

  const Stack = createStackNavigator();

  return (
    <GlobalContext.Provider value={{authData,setAuthenticated}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
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

          {/*
  (authenticated)?
  <>
 <Stack.Screen name="Welcome" component={Welcome} options={{ title: 'Welcome' }} />
   <Stack.Screen name="Perfil" component={Perfil} options={{ title: 'Perfil' }} />
     <Stack.Screen name="Amigos" component={Amigos} options={{ title: 'Amigos' }} />

  </>
  :
  <>
  <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }}/>
  <Stack.Screen name="Signup" component={Signup} options={{ title: 'Signup' }} />
          </>*/}
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalContext.Provider>
  );
}
