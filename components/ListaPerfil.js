import { StyleSheet, Text, View } from "react-native";

import React from "react";

const ListaPerfil = (props) => {
  return (
    <View style={styles.flatContainer}>
      <View style={styles.container}>
        <Text style={styles.flat}>Name: {props.textNombre}</Text>
       {console.log(props.textNombre)}
        <Text style={styles.flat}>Language: {props.textIdioma}</Text>
        {console.log(props.textIdioma)}
        <Text style={styles.flat}>Age: {props.textEdad}</Text>
        {console.log(props.textEdad)}
      </View>
    </View>
  );
};
export default ListaPerfil;

const styles = StyleSheet.create({
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

  container: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "coral",
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
  },
});
