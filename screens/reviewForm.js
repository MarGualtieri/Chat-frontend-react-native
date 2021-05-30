import React from 'react';
import { StyleSheet, Button, TextInput, View, Text } from 'react-native';
import { globalStyles } from '../styles/global.js';
import { Formik } from 'formik';

export default function ReviewForm({enviarValores}) {

  return (
    
    <View style={globalStyles.container}>
      <Formik
        initialValues={{ title: '', body: '', rating: '' }}
        onSubmit={(values, actions) => { // values es el objeto que se envia con la info
          actions.resetForm(); // resetea el formulario al darle a al boton submit
          enviarValores(values); // se le carga una funcion que llega como parametro y la devuelve con el objeto cargado
        }}
      >
        
        {props => (
          <View>
            <TextInput
              style={globalStyles.input}
              placeholder='Review title'
              onChangeText={props.handleChange('title')}
              value={props.values.title}
            />

            <TextInput
              style={globalStyles.input}
              multiline
              placeholder='Review details'
              onChangeText={props.handleChange('body')}
              value={props.values.body}
            />

            <TextInput 
              style={globalStyles.input}
              placeholder='Rating (1 - 5)'
              onChangeText={props.handleChange('rating')}
              value={props.values.rating}
              keyboardType='numeric'
            />
            
            <Button color='maroon' title="Submit" onPress={props.handleSubmit} /> 
          </View>
        )}
      </Formik>
    </View>
    
  );
}