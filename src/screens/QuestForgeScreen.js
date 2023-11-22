import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { startNewGame } from '../api/Api';

const QuestForgeScreen = ({ route }) => {
  const [data, setData] = useState(null);
  const [userChoice, setUserChoice] = useState(null);
  const [options, setOptions] = useState('');
  const [scene, setScene] = useState('');

  const API_URL = 'http://localhost:3001';

  useEffect(() => {
    const fetchDataAndDisplay = async () => {
      try {
        // Make a POST request using Axios
        const response = await axios.post(`${API_URL}/aws/prompt/1`);
        console.log("HERE'S THE RESPONSE ", response.data);

        // Populate the form with the initial response
        populateFormWithData(response.data);

        // Set scene and options state
        setScene(response.data.scene);
        setOptions(response.data.options);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchDataAndDisplay();
  }, []);

  const populateFormWithData = (responseData) => {
    setData(responseData);
  };

  const handleUserChoice = async (event) => {
    event.preventDefault();
    if (userChoice !== null && data !== null) {
      try {
        const response = await axios.post(
          `https://tjmp838d98.execute-api.us-west-2.amazonaws.com/WorkingPOST/user/{USER_ID}`,
          {
            ...data,
            userChoice,
          }
        );

        const generatedStory = response.data.story;

        // Populate the form with the generated story
        populateFormWithData(generatedStory);
      } catch (error) {
        console.error('Error submitting user choice:', error);
      }
    }
  };

  const renderOptions = () => {
    if (options && !data.deathScene) {
      return options.map((option, index) => (
        <View key={index}>{/* ... rest of the code */}</View>
      ));
    } else {
      return <Text>Loading...</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quest Forge</Text>
      <View style={styles.userInfo}>
        {data ? (
          data.deathScene ? (
            <View>
              <Text style={styles.deathScene}>{data.deathScene}</Text>
            </View>
          ) : (
            <View>
              <Text>
                Name: <Text style={styles.userName}>{data.user.name}</Text>
              </Text>
              <Text>
                ID: <Text style={styles.userID}>{data.user.id}</Text>
              </Text>
              <Text>
                Age: <Text style={styles.userAge}>{data.user.age}</Text>
              </Text>
              <Text>
                Race: <Text style={styles.userRace}>{data.user.race}</Text>
              </Text>
              <Text>
                Class: <Text style={styles.userClass}>{data.user.class}</Text>
              </Text>
            </View>
          )
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
      {scene ? <Text style={styles.scene}>{scene}</Text> : null}
      {data && !data.deathScene ? (
        <View style={styles.optionsForm} onSubmit={handleUserChoice}>
          <Text style={styles.legend}>Options</Text>
          <View style={styles.optionsList}>{renderOptions()}</View>
          <TouchableOpacity title="Submit Choice" onPress={handleUserChoice} />
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
  },
});

export default QuestForgeScreen;
