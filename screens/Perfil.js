import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  Button,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import { globalStyles } from "../styles/global";

export default function Perfil({ route, navigation }) {
  const { userId, token, usuario } = route.params;

  


  const [reviews, setReviews] = useState([
    {
      Nombre: usuario.nombre,
      Idioma: usuario.idioma,
      Mail: usuario.email,
      Edad: usuario.edad,
      key: usuario.id,
    },
  ]);

  {
    /*-----------------USUARIOS BACKEND---------------*/
  }

  const [nombre, setNombre] = useState(usuario.nombre);
  const [edad, setEdad] = useState(usuario.edad);
  const [email, setEmail] = useState(usuario.email);
  const [idioma, setIdioma] = useState(usuario.idioma);

  const USUARIOS = "https://apichathello.herokuapp.com/users/"+userId;

  function editarNombre() {
    fetch(USUARIOS, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: nombre,
        idioma: idioma,
        edad: edad,
        email: email,
        
      }),
    })
      .then((res) => {
        alert("Cambio Guardado");
        //navigation.navigate("Perfil", { userId, token, usuario })
        actualizar()
      })
      .catch((error) => alert(error.message));
    
  }

 
 
 

  {
    /*-----------------app---------------*/
  }

  return (
    <ScrollView style={{ width: "100%" }}>
      <View style={styles.container}>
        <View style={styles.fondo}>
          <View>
            <FlatList
              data={reviews}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => navigation.navigate("ReviewDetails", item)}
                >
                  <Card>
                    <Text style={globalStyles.titleText}>
                      NOMBRE: {item.Nombre}
                    </Text>
                    <Text style={globalStyles.titleText}>
                      IDIOMA: {item.Idioma}
                    </Text>
                    <Text style={globalStyles.titleText}>
                      EDAD: {item.Edad}
                    </Text>
                    <Text style={globalStyles.titleText}>
                      EMAIL: {item.Mail}
                    </Text>
                  </Card>
                </TouchableOpacity>
              )}
            />
          </View>

          {/*-----------------TEST USUARIOS---------------*/}
          <View>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setNombre(text)}
              value={nombre}
              placeholder=" edite su nombre"
            />

            <View style={{ marginHorizontal: 60 }}>
              <Button
                onPress={editarNombre}
                title="EDITAR NOMBRE"
                color="#841584"
              />
            </View>

            <TextInput
              style={styles.input}
              onChangeText={(text) => setIdioma(text)}
              value={idioma}
              placeholder=" edite su idioma"
            />
            <View style={{ marginHorizontal: 60 }}>
              <Button
                onPress={editarNombre}
                title="EDITAR IDIOMA"
                color="#841584"
              />
            </View>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setEdad(text)}
              value={edad}
              placeholder=" edite su edad"
              keyboardType="numeric"
            />
            <View style={{ marginHorizontal: 60 }}>
              <Button
               onPress={editarNombre}
                title="EDITAR EDAD"
                color="#841584"
              />
            </View>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setEmail(text)}
              value={email}
              placeholder=" edite su email"
            />
            <View style={{ marginHorizontal: 60, marginBottom: 15 }}>
              <Button
                onPress={editarNombre}
                title="EDITAR EMAIL"
                color="#841584"
              />
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
  },

  modalContent: {
    flex: 0.62, // en 1 toma toda la pantalla esto controla el alto del modal
    marginTop: "auto", // usando valores empieza a recortar el modal desde abajo
    backgroundColor: "white",
    marginHorizontal: 20,
    //width:'50%' recorta tambien
  },
  modalToggle: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 200,
    borderWidth: 2,
    borderColor: "coral",
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
  },
  modalClose: {
    marginTop: 20,
    marginBottom: 0,
    borderWidth: 2,
    borderColor: "coral",
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
  },
  formik: {
    marginTop: 20,
    marginBottom: 0,
    borderWidth: 2,
    borderColor: "coral",
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
  },
  fondo: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff0f0",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
  },
  tex: {
    fontSize: 20,
    marginVertical: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});
