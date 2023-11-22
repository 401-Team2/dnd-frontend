import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, Picker, TouchableOpacity, StyleSheet } from 'react-native';
// import api from '../api/Api';
// import { startNewGame, generateStory } from '../api/Api';

import axios from 'axios';

// const API_URL = 'https://tjmp838d98.execute-api.us-west-2.amazonaws.com/WorkingPOST';

const QuestForgeScreen = ({ route }) => {
  const [data, setData] = useState(null);
  const [userChoice, setUserChoice] = useState(null);

  // const API_URL = 'http://localhost:3001';

  // useEffect(() => {
  //   if (route.params?.newGame) {
  //     console.log("Received character data:", route.params.character);

  //     fetchDataAndDisplay();
  //   }
  // }, [route.params]);

  // const fetchDataAndDisplay = async () => {
  //   try {
  //     const gameData = await startNewGame({ characterData: route.params.character });
  //     setData(gameData);
  //   } catch (error) {
  //     console.error('Error starting new game:', error);
  //   }
  // };
  
  // // const continueGame = async (character) => {
  // //   try {
  // //     const data = await api.loadGame(character.id);
  // //     setData(data);
  // //   } catch (error) {
  // //     console.error('Error:', error);
  // //   }
  // // };
  
  // const handleUserChoice = async () => {
  //   try {
  //     const storyPrompt = "Your prompt based on user choice and game data";
  //     const storyData = await generateStory({ prompt: storyPrompt });

  //     setData(prevData => ({ ...prevData, currentScene: storyData.story }));
  //   } catch (error) {
  //     console.error('Error generating story:', error);
  //   }
  // };

  useEffect(() => {
    fetchDataAndDisplay();
  }, []);

  const populateFormWithData = (responseData) => {
    setData(responseData);
  };

  const fetchDataAndDisplay = async () => {
    try {
      // Make a POST request using Axios
      const response = await axios.post(`https://tjmp838d98.execute-api.us-west-2.amazonaws.com/WorkingPOST/adventure`);
      const responseData = response.data;
      console.log("HERE'S THE RESPONSE ", response);

      // Populate the form with the initial response
      populateFormWithData(responseData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUserChoice = async (event) => {
    event.preventDefault();
    if (userChoice !== null && data !== null) {
      const response = await axios.post(`https://tjmp838d98.execute-api.us-west-2.amazonaws.com/WorkingPOST/user/{USER_ID}`, {
        ...data,
        userChoice,
      });
      const generatedStory = response.data.story;
      // const updatedData = response.data;
      populateFormWithData(generatedStory);
    }
  };

  const renderOptions = () => {
    if (data && !data.deathScene) {
      return data.options.map((option, index) => (
        <View key={index}>
          <TextInput
            style={styles.optionButton}
            name='userChoice'
            value={index}
            id={`option${index}`}
            onChange={(e) => setUserChoice(option)}
            checked={userChoice === option}
          />
          <label htmlFor={`option${index}`}>{option}</label>
          {/* <Text>Name: <Text style={styles.userName}>{data.user.name}</Text></Text>
          <Text>Age: <Text style={styles.userAge}>{data.user.age}</Text></Text>
          <Text>Race: <Text style={styles.userRace}>{data.user.race}</Text></Text>
          <Text>Class: <Text style={styles.userClass}>{data.user.class}</Text></Text> */}
        </View>
      ));
    } else {
      return <Text>Loading...</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quest Forge</Text>
      <View style={styles.userInfo}>
        {/* {renderUserData()} */}
        {data ? (
          data.deathScene ? (
            <View>
              <Text style={styles.deathScene}>{data.deathScene}</Text>
            </View>
          ) : (
            <View>
              <Text>Name: <Text style={styles.userName}>{data.user.name}</Text></Text>
              <Text>ID: <Text style={styles.userID}>{data.user.id}</Text></Text>
              <Text>Age: <Text style={styles.userAge}>{data.user.age}</Text></Text>
              <Text>Race: <Text style={styles.userRace}>{data.user.race}</Text></Text>
              <Text>Class: <Text style={styles.userClass}>{data.user.class}</Text></Text>
            </View>
          )
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
      {data && data.scene ? <Text style={styles.scene}>{data.scene}</Text> : null}
      {data && !data.deathScene ? (
        <View style={styles.optionsForm} onSubmit={handleUserChoice}>
          <Text style={styles.legend}>Options</Text>
          <View style={styles.optionsList}>{renderOptions()}</View>
          <TouchableOpacity title='Submit Choice' onPress={handleUserChoice} />
        </View>
      ) : null}
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
