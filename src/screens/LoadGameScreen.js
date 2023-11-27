import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  FlatList,
  StyleSheet,
} from 'react-native';
import api from '../api/Api';
import CharacterCard from '../components/CharacterCard';
import bgImg from '../../assets/bgImg.jpeg';

const LoadGameScreen = ({ navigation }) => {
  const mockCharacter = {
    id: 1,
    name: 'Aragorn',
    race: 'Human',
    class: 'Ranger',
    age: 87,
  };

  const [characters, setCharacters] = useState([mockCharacter]);

  useEffect(() => {
    fetchCharacters();
  }, []);

  const handleCharacterSelect = (character) => {
    navigation.navigate('QuestForge', { character: character });
  };

  return (
    <ImageBackground
      source={bgImg}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.9,
      }}
    >
      <Text style={styles.title}>Load Game</Text>
      <FlatList
        style={styles.list}
        data={characters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CharacterCard
            style={styles.characterCard}
            character={item}
            onSelect={() => handleCharacterSelect(item)}
          />
        )}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    marginTop: 20,
    marginBottom: 10,
    color: 'gold',
  },
  list: {
    flex: 1,
    width: '100%',
    marginRight: 10,
  },
  characterCard: {
    alignItems: 'left',
    backgroundColor: '#000',
  },
});

export default LoadGameScreen;
