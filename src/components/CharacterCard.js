import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import AragornImg from '../../assets/Aragorn.png';

const CharacterCard = ({ character }) => {
  return (
    <View style={styles.card}>
      <View style={styles.leftContainer}>
        <Image
          style={styles.icon}
          source={AragornImg}
        />
        <Text style={styles.name}>{character.name}</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.info}>Age: {character.age}</Text>
        <Text style={styles.info}>Race: {character.race}</Text>
        <Text style={styles.info}>Class: {character.class}</Text>
        <Text style={styles.info}>Id: {character.id}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 13,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '100%',
  },
  leftContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 20,
  },
  icon: {
    width: 70,
    height: 70,
    borderRadius: 25,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  details: {
    flex: 1
  },
  info: {
    fontSize: 14,
  },
});

export default CharacterCard;
