import "react-native-gesture-handler";

import React, { useContext, useEffect, useState } from "react";

import AsyncStorage from "./utils/AsyncStorage";
import Chat from './screens/Chat'
import Friends from "./screens/Friends";
import GlobalContext from "./components/global/context/index";
import Login from "./screens/Login";
import { NavigationContainer } from "@react-navigation/native";
import Profile from "./screens/Profile";
import Signup from "./screens/Signup";
import Welcome from "./screens/Welcome";
import { createStackNavigator } from "@react-navigation/stack";

export default function App() {

  
  const [authData, setAuthData] = useState({});

  const [authenticated, setAuthenticated] = useState(false);

  //hacer OpenId Protocol
  const applyAuthentication = (user) =>{

    AsyncStorage.storeData('@userData', user)
    checkUser()
  }

  const applyLogout = () =>{
    AsyncStorage.clearAll()
    setAuthenticated(false)
  }

  const checkUser = async () =>{
    const user = await AsyncStorage.getData('@userData')
    console.log(user)
    if (user){
      setAuthenticated(true)
      setAuthData(user)
    }
  }
  

  useEffect(() => {
    checkUser()

  }, [])

  const Stack = createStackNavigator();

  return (
    <GlobalContext.Provider value={{ authData,setAuthData, setAuthenticated, applyAuthentication, applyLogout }}>
      <NavigationContainer>
        <Stack.Navigator>
          
          {  
          (authenticated)?
          <>
            <Stack.Screen name="Welcome" component={Welcome} options={{ title: "Welcome" }} />
            <Stack.Screen name="Profile" component={Profile} options={{ title: 'Profile' }} />
            <Stack.Screen name="Friends" component={Friends} options={{ title: 'Friends' }} />
            <Stack.Screen name="Chat" component={Chat} options={{ title: 'Chat' }} />

          </>
          :
          <>
            <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }} />
            <Stack.Screen name="Signup" component={Signup} options={{ title: 'Signup' }} />
          </>
          }
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalContext.Provider>
  );
}