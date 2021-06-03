import { Text, View } from 'react-native';

import React from 'react';
import { globalStyles } from '../styles/global';

export default function About({ navigation }) {
    return (
      <View style={globalStyles.container}>
        <Text>Isabel Sayago</Text>
        <Text>Mariano Gualtieri</Text>
        <Text>German Gross</Text>
        <Text>Agustina</Text>
        <Text>Tom Maenhout</Text>
      </View>
    );
  }