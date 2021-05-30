import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { globalStyles } from "../styles/global";
import Card from "../shared/card";

export default function Perfil({ navigation }) {
  const [reviews, setReviews] = useState([
    {
      Nombre: "Lionel Messi",
      Idioma: "Español",
      Mail: "messi@gmail.com",
      Edad: 34,
      key: "1",
    },
  ]);

  return (
    <View style={globalStyles.container}>
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
    </View>
  );
}
