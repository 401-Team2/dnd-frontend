import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CharacterCard = ({ character }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{character.name}</Text>
      <Text>Race: {character.race}</Text>
      <Text>Class: {character.class}</Text>
      <Text>Age: {character.age}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CharacterCard;
