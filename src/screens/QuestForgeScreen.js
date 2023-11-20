import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, Picker, TouchableOpacity, StyleSheet } from 'react-native';
import api from '../api/Api';
// import axios from 'axios';

// const SERVER_URL = 'https://tjmp838d98.execute-api.us-west-2.amazonaws.com/WorkingPOST';

const QuestForgeScreen = ({ route }) => {
  const [data, setData] = useState(null);
  const [userChoice, setUserChoice] = useState(null);

  useEffect(() => {
    if (route.params?.newGame) {
      fetchDataAndDisplay();
    } else if (route.params?.character) {
    //   const character = route.params.character;
    //   continueGame(character);
      continueGame(route.params.character);
    }
  }, [route.params]);

  const fetchDataAndDisplay = async () => {
    try {
      const data = await api.startNewGame();
      setData(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const continueGame = async (character) => {
    try {
      const data = await api.loadGame(character.id);
      setData(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

//   const continueGame = async (character) => {
//     try {
//       const gameData = await api.loadGame(character.id);
//       setData(gameData);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };
  
  const handleUserChoice = async () => {
    try {
      const updatedData = await api.continueGame(data, userChoice);
      setData(updatedData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const renderOptions = () => {
    if (data && data.options) {
      return data.options.map((option, index) => (
        <TouchableOpacity 
          key={index} 
          style={styles.optionButton}
          onPress={() => setUserChoice(option)}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ));
    } else {
      return <Text>No options available</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quest Forge Adventure</Text>
      {data && data.scene && <Text style={styles.scene}>{data.scene}</Text>}
      <View style={styles.optionsContainer}>
        {renderOptions()}
      </View>
      <Button title="Submit Choice" onPress={handleUserChoice} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  optionsContainer: {
    marginVertical: 20,
  },
  optionButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  optionText: {
    fontSize: 16,
  },
  scene: {
    fontSize: 18,
    marginBottom: 20,
  }
});

export default QuestForgeScreen;
