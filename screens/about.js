import React from 'react';
import { View, Text } from 'react-native';
import { globalStyles } from '../styles/global';


export default function About({ navigation }) {
    return (
      <View style={globalStyles.container}>
        <Text>Ysabel Sayago</Text>
        <Text>Mariano Gualtieri</Text>
        <Text>German Gross</Text>
        <Text>Agustina</Text>
        <Text>Tom Maenhout</Text>
      </View>
    );
  }