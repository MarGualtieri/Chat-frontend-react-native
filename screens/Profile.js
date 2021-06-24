import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";

import AsyncStorage from "../utils/AsyncStorage";
import GlobalContext from "../components/global/context";
import ListaPerfil from "../components/ListaPerfil";

{
  /*-----------------INICIO DE LA APLICACION---------------*/
}

export default function Profile({ navigation }) {
  const { authData, setAuthData } = useContext(GlobalContext);

  const [nameUser, setNameUser] = useState();
  const [languageUser, setLanguageUser] = useState();
  const [ageUser, setAgeUser] = useState();
  const [currentUser, setCurrentUser] = useState({});

  const saveChanges = () => {
    const userUpdated = {
      ...currentUser,
      name: nameUser,
      age: ageUser,
      language: languageUser,
    };
    AsyncStorage.storeData("@userData", userUpdated);
    setAuthData(userUpdated);
    //navigation.navigate("Welcome");
  };

  {
    /*-----------------USER BACKEND---------------*/
  }

  const textHandlerName = (event) => {
    setNameUser(event.target.value);
  };
  const textHandlerLanguage = (event) => {
    setLanguageUser(event.target.value);
  };
  const textHandlerAge = (event) => {
    setAgeUser(event.target.value);
  };

  //const userdb = "http://localhost:3000/users/" + authData._id
  const userdb = "https://apichathello.herokuapp.com/users/" + authData._id;

  function editUser() {
    fetch(userdb, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        //'Authorization': `Bearer  `,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameUser,
        language: languageUser,
        age: ageUser,
      }),
    })
      .then((res) => {
        alert("Change was successful");
        console.log(nameUser, languageUser, ageUser);
        saveChanges();
      })
      .catch((error) => alert(error.message));
  }

  {
    /*-----------------app---------------*/
  }

  async function bringUserData() {
    const user = await AsyncStorage.getData("@userData");
    if (user) {
      setCurrentUser(user);
    }
  }

  useEffect(() => {
    bringUserData();
  }, []);

  return (
    <ScrollView style={{ width: "100%" }}>
      <View style={styles.container}>
        <View style={styles.fondo}>
          <View>
            <Text style={styles.title}>Your profile</Text>
            <ListaPerfil
              textNombre={authData.name}
              textIdioma={authData.language}
              textEdad={authData.age}
            />
          </View>

          {/*-----------------TEST USUARIOS---------------*/}
          <View style={styles.flatContainer}>
            <View style={styles.container2}>
              <View style={styles.fondo2}>
                <Text style={styles.title}>Modify your personal data</Text>
              </View>
              <TextInput
                style={styles.flat}
                onChangeText={(text) => {
                  if (text !== "") {
                    setNameUser(text);
                  } else {
                    setNameUser(authData.name);
                  }
                }}
                onChange={textHandlerName}
                placeholder="Edit your name"
                autoCapitalize="none"
              />

              <TextInput
                style={styles.flat}
                onChangeText={(text) => {
                  if (text !== "") {
                    setLanguageUser(text);
                  } else {
                    setLanguageUser(authData.language);
                  }
                }}
                onChange={textHandlerLanguage}
                placeholder="Edit your language"
                autoCapitalize="none"
              />

              <TextInput
                style={styles.flat}
                onChangeText={(text) => {
                  if (text !== "") {
                    setAgeUser(text);
                  } else {
                    setAgeUser(authData.age);
                  }
                }}
                onChange={textHandlerAge}
                placeholder="Edit your age"
                autoCapitalize="none"
                keyboardType="numeric"
              />
              <View style={{ marginHorizontal: 60, marginVertical: 20 }}>
                <Button
                  onPress={editUser}
                  title={"Save Changes"}
                  color="#841584"
                />
              </View>
            </View>
          </View>

          {/*-----------------FIN DE BLOQUE---------------*/}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "coral",
  },

  fondo: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff0f0",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 8,
  },
  tex: {
    fontSize: 20,
    marginVertical: 20,
  },
  flat: {
    flex: 1,
    width: "85%",
    marginVertical: 10,
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
    backgroundColor: "white",
    alignItems: "center",
    padding: 5,
    marginTop: 5,
    borderRadius: 10,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 8,
  },

  container2: {
    width: "100%",
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 8,
  },

  flatContainer: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "coral",
    flex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 8,
  },
  title: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
    alignItems: "center",
    textAlign: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 8,
  },
  fondo2: {
    backgroundColor: "#fff0f0",
    flex: 1,
    width: "100%",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 8,
  },
});
