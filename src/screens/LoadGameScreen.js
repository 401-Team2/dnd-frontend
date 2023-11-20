import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
// import axios from 'axios';
import api from '../api/Api';
import CharacterCard from '../components/CharacterCard';

const LoadGameScreen = ({ navigation }) => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    try {
      const charactersData = await api.fetchCharacters();
      setCharacters(charactersData);
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  };

  const handleCharacterSelect = (character) => {
    navigation.navigate('QuestForge', { character: character });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Load Game</Text>
      <FlatList
        data={characters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CharacterCard 
            character={item} 
            onSelect={() => handleCharacterSelect(item)} 
          />
        )}
      />
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

export default LoadGameScreen;
