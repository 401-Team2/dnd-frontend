import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import axios from 'axios';
// import OptionList from 'src/components/OptionList.js';
// import UserInfo from '../components/UserInfo';
import { fetchInitialData } from '../utils/api';

const MainScreen = () => {
  const [data, setData] = useState(null);
  const [userChoice, setUserChoice] = useState(null);

  useEffect(() => {
    fetchInitialData().then(setData);
  }, []);

  const populateFormWithData = (responseData) => {
    setData(responseData);
  };

  const fetchInitialData = async () => {
    try {
      // Make a POST request using Axios
      const response = await axios.post(`${SERVER_URL}/adventure`);
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
      const response = await axios.post(`${SERVER_URL}/adventure`, {
        ...data,
        userChoice,
      });
      const updatedData = response.data;
      populateFormWithData(updatedData);
    }
  };

  const renderOptions = () => {
    if (data && !data.deathScene) {
      return data.options.map((option, index) => (
        <View style={styles.container} key={index}>
          <TextInput
            type='radio'
            name='userChoice'
            value={index}
            id={`option${index}`}
            onChange={(e) => setUserChoice(option)}
            checked={userChoice === option}
          />
          <Text htmlFor={`option${index}`}>{option}</Text>
        </View>
      ));
    } else {
      return null;
    }
  };

  return (
  //     <View style={styles.container}>
  //       <Text style={styles.title}>Quest Forge</Text>
  //       {data && data.user && <UserInfo user={data.user} />}
  //     </View>
  // );
  <View style={styles.container}>
      <Text style={styles.header}>Quest Forge</Text>
      <View style={styles.container}>
        {data ? (
          data.deathScene ? (
            <View style={styles.container}>
              <Text id="death-scene">{data.deathScene}</Text>
            </View>
          ) : (
            <View style={styles.container}>
              <Text style={styles.title}>
                Name: <Text id='userName'>{data.user.name}</Text>
              </Text>
              <Text style={styles.title}>
                Age: <Text id='userAge'>{data.user.age}</Text>
              </Text>
              <Text style={styles.title}>
                Race: <Text id='userRace'>{data.user.race}</Text>
              </Text>
              <Text style={styles.title}>
                Class: <Text id='userClass'>{data.user.class}</Text>
              </Text>
            </View>
          )
        ) : (
          <Text style={styles.title}>Loading...</Text>
        )}
      </View >
      {data && data.scene ? <View style={styles.container} id='scene'>{data.scene}</View> : null}
      {data && !data.deathScene ? (
        <form id='optionsForm' onSubmit={handleUserChoice}>
          <fieldset>
            <legend>Options</legend>
            <View style={styles.container} id='optionsList'>{renderOptions()}</View>
          </fieldset>
          <button type='submit'>Submit Choice</button>
        </form>
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
    marginBottom: 120,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
    color: '#E63946',
  },
  header: {
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
    color: '#E63946',
  },
});

export default MainScreen;
