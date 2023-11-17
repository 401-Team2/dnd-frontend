import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Button, Alert } from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';

const serverUrl = Config.SERVER_URL;

const MainScreen = () => {
  const [data, setData] = useState(null);
  const [userChoice, setUserChoice] = useState(null);

  // Function to fetch initial data from the server
  const fetchInitialData = async () => {
    try {
      const response = await axios.post(`${serverUrl}/adventure`);
      setData(response.data);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert("Error", "Failed to fetch data from the server.");
    }
  };

  // Effect to load data on component mount
  useEffect(() => {
    fetchInitialData();
  }, []);

  // Function to handle user choice submission
  const handleUserChoice = async () => {
    if (userChoice !== null && data !== null) {
      try {
        const response = await axios.post(`${serverUrl}/adventure`, {
          ...data,
          userChoice,
        });
        setData(response.data);
      } catch (error) {
        console.error('Error:', error);
        Alert.alert("Error", "Failed to submit user choice.");
      }
    }
  };

  // Function to render user choices as buttons
  const renderOptions = () => {
    if (data?.options) {
      return data.options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.button}
          onPress={() => setUserChoice(option)}
        >
          <Text style={styles.buttonText}>{option}</Text>
        </TouchableOpacity>
      ));
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Quest Forge</Text>
      <View style={styles.container}>
        {data ? (
          data.deathScene ? (
            <Text style={styles.deathScene}>{data.deathScene}</Text>
          ) : (
            <View>
              <Text style={styles.title}>Name: {data.user.name}</Text>
              <Text style={styles.title}>Age: {data.user.age}</Text>
              <Text style={styles.title}>Race: {data.user.race}</Text>
              <Text style={styles.title}>Class: {data.user.class}</Text>
            </View>
          )
        ) : (
          <Text style={styles.title}>Loading...</Text>
        )}
      </View>
      {data && data.scene ? <Text style={styles.scene}>{data.scene}</Text> : null}
      {data && !data.deathScene ? (
        <View style={styles.optionsContainer}>
          <Text style={styles.optionsHeader}>Options:</Text>
          {renderOptions()}
          <Button title='Submit Choice' onPress={handleUserChoice} />
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
    backgroundColor: '#f0f8ff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#E63946',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#E63946',
    marginBottom: 20,
  },
  deathScene: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
  scene: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginVertical: 10,
  },
  optionsContainer: {
    marginTop: 20,
  },
  optionsHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4e9af1',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default MainScreen;
