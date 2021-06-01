import React, { useState } from "react";
import { Keyboard, StyleSheet, View, Text, TouchableOpacity, FlatList, Modal, TouchableWithoutFeedback, } from "react-native";
import { globalStyles } from "../styles/global";
import { MaterialIcons } from "@expo/vector-icons";
import ReviewForm from './reviewForm'
import Card from "../components/Card";

export default function Perfil({ navigation }) {

  const [modalOpen, setModalOpen] = useState(false);

  const [reviews, setReviews] = useState([
    {
      Nombre: "Lionel Messi",
      Idioma: "Español",
      Mail: "messi@gmail.com",
      Edad: 34,
      key: "1",
    },
  ]);

  {/*-----------------modal---------------*/ }


  const enviarValores = (values) => {

    setModalOpen(false);
    console.log(values)

    values.key = Math.random().toString();
    setValores((currentReviews) => {
      return [values, ...currentReviews];
    });
    setModalOpen(false);




  };
  {/*-----------------fin de modal---------------*/ }

  return (
    <View style={styles.container}>
      <View style={styles.fondo}>


        <FlatList
          data={reviews}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("ReviewDetails", item)}
            >
              <Card>
                <Text style={globalStyles.titleText}>NOMBRE: {item.Nombre}</Text>
                <Text style={globalStyles.titleText}>IDIOMA: {item.Idioma}</Text>
                <Text style={globalStyles.titleText}>EDAD: {item.Edad}</Text>
                <Text style={globalStyles.titleText}>MAIL: {item.Mail}</Text>
              </Card>
            </TouchableOpacity>
          )}
        />

        <View style={styles.container}>
          <Text style={styles.tex}>EDITAR PERFIL</Text>
          <Modal visible={modalOpen} animationType='slide' transparent={true}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.modalContent}>
                <MaterialIcons
                  name='close'
                  size={24}
                  style={styles.modalClose}
                  onPress={() => setModalOpen(false)}
                />

                <ReviewForm enviarValores={enviarValores} style={styles.formik} />
              </View>
            </TouchableWithoutFeedback>
          </Modal>

          {/* icono por fuera del modal*/}
          <MaterialIcons
            name='add'
            size={24}
            style={styles.modalToggle}
            onPress={() => setModalOpen(true)}
          />



        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {

    padding: 20,
    alignItems: 'center',
    justifyContent: "center",
  },

  modalContent: {
    flex: 0.62, // en 1 toma toda la pantalla esto controla el alto del modal
    marginTop: 'auto', // usando valores empieza a recortar el modal desde abajo 
    backgroundColor: 'white',
    marginHorizontal: 20,
    //width:'50%' recorta tambien
  },
  modalToggle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 200,
    borderWidth: 2,
    borderColor: 'coral',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',

  },
  modalClose: {
    marginTop: 20,
    marginBottom: 0,
    borderWidth: 2,
    borderColor: 'coral',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
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
    width: '100%',
    height: '100%',
    backgroundColor: '#fff0f0',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10

  },
  tex: {
    fontSize: 20,
    marginVertical: 20

  }
})