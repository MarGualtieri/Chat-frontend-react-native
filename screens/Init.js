import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { 
StyleSheet,
Text,
View,
TouchableOpacity,
TextInput } from 'react-native';

export default function Init() {
  return (
    <View style={styles.init}>
        <Text style={styles.header}>Hey!</Text>

        <TextInput
            style={styles.input}
            placeholder= "Type your e-mail"
        />
         <TextInput
            style={styles.input}
            placeholder= "Type your password"
        />
        <TouchableOpacity 
            style={styles.button}
            onPress={()=> alert("Are you sure?")}
        >
            <Text>Continue</Text>

        </TouchableOpacity>

        <TouchableOpacity 
            style={styles.button}
            onPress={()=> alert("Are you sure?")}
        >
            <Text>I don't have an account</Text>

        </TouchableOpacity>
        <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  init: {
   // flex: 1,
    backgroundColor: '#fff',
  },
  header:{
      backgroundColor: '#fff',
      justifyContent: 'top',
      alignSelf: 'top',
      paddingTop: 50,
      
  },
  input:{
      justifyContent:'center',
      alignSelf: 'stretch',
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      alignContent: 'center',
      height: 40,
      marginTop: 10
  },
  button:{
      backgroundColor: '#cdcdcd',
      borderRadius: 50,
      alignItems: 'center',
      marginTop: 10
  }
});
