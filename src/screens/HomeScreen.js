import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to QuestForge</Text>
      <Button title="Start Game" onPress={() => navigation.navigate('StartGame')} />
      <Button title="Load Game" onPress={() => navigation.navigate('LoadGame')} />
      <Button title="Options" onPress={() => navigation.navigate('OptionsMenu')} />
      <Button title="About" onPress={() => navigation.navigate('About')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default HomeScreen;
