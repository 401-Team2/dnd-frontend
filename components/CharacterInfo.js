import React from 'react';
import { View, Text } from 'react-native';

const CharacterInfo = ({ user }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.description}>Name: {user?.name}</Text>
      <Text style={styles.description}>Age: {user?.age}</Text>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f0f8ff',
    marginBottom: 120,
  },
  description: {
    fontSize: 16,
    fontWeight: 'bold',
  },
};

export default CharacterInfo;
