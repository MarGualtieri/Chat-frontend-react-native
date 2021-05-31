import React, { useState } from "react";
import {Keyboard,StyleSheet, View, Text, TouchableOpacity, FlatList,Modal,TouchableWithoutFeedback, } from "react-native";
import { globalStyles } from "../styles/global";
import { MaterialIcons } from "@expo/vector-icons";
import ReviewForm from './reviewForm'
import Card from "../shared/card";

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

{/*-----------------modal---------------*/}
const [valores, setValores] = useState([
   
  
]);

const enviarValores = (values) => {
 
 setModalOpen(false);
 console.log(values)

 values.key = Math.random().toString();
 setValores((currentReviews) => {
   return [values, ...currentReviews];
 });
 setModalOpen(false);

 
  
 
};
{/*-----------------fin de modal---------------*/}

  return (
    <View style={styles.container}>
     
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

<Modal visible={modalOpen} animationType='slide' transparent={true}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
<View style={styles.modalContent}>
<MaterialIcons 
name='close'
size={24} 
style={styles.modalClose}
onPress={() => setModalOpen(false)}
/>
<ReviewForm enviarValores={enviarValores} style={styles.formik}/>
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

<Text>EDITAR PERFIL</Text>

</View>

    </View>
  );
}

const styles = StyleSheet.create({

 container: {

  padding: 20,
  alignItems: 'center',
  justifyContent: "center",
 } ,

modalContent: {
  flex:0.62, // en 1 toma toda la pantalla esto controla el alto del modal
  marginTop:'auto', // usando valores empieza a recortar el modal desde abajo 
  backgroundColor:'white',
  marginHorizontal: 20,
  //width:'50%' recorta tambien
},
modalToggle: {
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 10,
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
})