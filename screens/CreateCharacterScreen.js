'use strict';

import React from 'react';
import { View, TextInput, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCharacterField,
  resetCharacterForm,
} from '../store/characterCreator';
import { API } from 'aws-amplify';
import { v4 as uuidv4 } from 'uuid';

const CreateCharacterScreen = () => {
  const dispatch = useDispatch();
  const { name, race, characterClass, age } = useSelector(
    (state) => state.characterCreation
  );

  const handleSubmit = async () => {
    try {
      const characterId = uuidv4();

      const characterData = {
        id: characterId,
        name,
        race,
        characterClass,
        age,
      };

      // Dispatch an action to reset the form fields
      dispatch(resetCharacterForm());

      // Make the API call to update DynamoDB
      await API.post(
        'https://tjmp838d98.execute-api.us-west-2.amazonaws.com/WorkingPOST',
        '/midterm-users',
        { body: characterData }
      );
      console.log('Character created successfully!');
    } catch (error) {
      console.error('Error creating character:', error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={(text) =>
          dispatch(setCharacterField({ field: 'name', value: text }))
        }
      />
      <TextInput
        placeholder="Race"
        value={race}
        onChangeText={(text) =>
          dispatch(setCharacterField({ field: 'race', value: text }))
        }
      />
      <TextInput
        placeholder="Class"
        value={characterClass}
        onChangeText={(text) =>
          dispatch(setCharacterField({ field: 'characterClass', value: text }))
        }
      />
      <TextInput
        placeholder="Age"
        value={age}
        onChangeText={(text) =>
          dispatch(setCharacterField({ field: 'age', value: text }))
        }
        keyboardType="numeric"
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default CreateCharacterScreen;
