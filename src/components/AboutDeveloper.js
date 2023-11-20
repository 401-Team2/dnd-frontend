import React from 'react';
import { View, Text, Linking, StyleSheet } from 'react-native';

const AboutDeveloper = ({ developer }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{developer.name}</Text>
      <Text onPress={() => Linking.openURL(developer.linkedinUrl)}>LinkedIn</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AboutDeveloper;
