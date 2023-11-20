import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const StartGameScreen = ({ navigation }) => {
    const handleStartNewGame = () => {
    //   navigation.navigate('QuestForge', { newGame: true });
    navigation.navigate('CreateCharacter');
    };
  
    const handleLoadGame = () => {
      navigation.navigate('LoadGame');
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Start a New Game</Text>
        <Button title="Create New Character" onPress={handleStartNewGame} />
        <Button title="Load Existing Character" onPress={handleLoadGame} />
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
    fontSize: 20,
    marginBottom: 20,
  },
});

export default StartGameScreen;
