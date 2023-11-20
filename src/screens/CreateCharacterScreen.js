import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import api from '../api/Api';

// api.createCharacter(characterData);

const CreateCharacterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  const [race, setRace] = useState('Human');
  const [characterClass, setCharacterClass] = useState('Barbarian');

  const ageLimits = {
    Human: 100,
    Elf: 750,
    Aasimar: 160,
    Halflings: 150,
    Dragonborn: 80,
    Fairy: 5000,
    Siren: 500,
    Kitsune: 1000,
    Djinn: 5000,
    Angel: 5000,
    Demon: 5000,
    Vampire: 5000,
    Summoner: 100,
    Tiefling: 150,
    Warforged: Infinity,
    Rakshasa: 5000,
    Elemental: 5000
  };

  const getAgeLimit = (selectedRace) => {
    return ageLimits[selectedRace] || ageLimits['Human']; 
  };

  const [ageLimit, setAgeLimit] = useState(getAgeLimit(race));

  const handleRaceChange = (selectedRace) => {
    setRace(selectedRace);
    const newAgeLimit = getAgeLimit(selectedRace);
    setAgeLimit(newAgeLimit);
    if (parseInt(age, 10) > newAgeLimit) {
      setAge('');
    }
  };

  const classes = ['Barbarian', 'Mage', 'Archmage', 'Warrior', 'Archer'];

  const handleCreateCharacter = async () => {
    if (!name.trim() || !age) {
      alert("Please fill in all character details.");
      return;
    }
  
    const newCharacter = {
      name: name,
      age: age,
      race: race,
      class: characterClass,
      gender: gender,
    };
  
    try {
      await api.createCharacter(newCharacter);
    } catch (error) {
      console.error('Error creating character:', error);
      alert('Failed to create character');
      return;
    }
  
    navigation.navigate('QuestForge', { newGame: true, character: newCharacter });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <Picker
        selectedValue={age}
        style={styles.picker}
        onValueChange={(itemValue) => setAge(itemValue)}
      >
        {[...Array(ageLimit + 1).keys()].map((ageNumber) => (
          <Picker.Item key={ageNumber} label={ageNumber.toString()} value={ageNumber} />
        ))}
      </Picker>
      <Picker
        selectedValue={gender}
        style={styles.picker}
        onValueChange={(itemValue) => setGender(itemValue)}
      >
        <Picker.Item label="Male" value="Male" />
        <Picker.Item label="Female" value="Female" />
        <Picker.Item label="Shapeshifter" value="Shapeshifter" />
        <Picker.Item label="Elfritch" value="Elfritch" />
        <Picker.Item label="Primordial" value="Primordial" />
        <Picker.Item label="Numinous" value="Numinous" />
        <Picker.Item label="Transcendent" value="Transcendent" />
      </Picker>
      <Picker
        selectedValue={race}
        style={styles.picker}
        onValueChange={(itemValue) => handleRaceChange(itemValue)}
      >
        <Picker.Item label="Human" value="Human" />
        <Picker.Item label="Elf" value="Elf" />
        <Picker.Item label="Aasimar" value="Aasimar" />
        <Picker.Item label="Halflings" value="Halflings" />
        <Picker.Item label="Dragonborn" value="Dragonborn" />
        <Picker.Item label="Fairy" value="Fairy" />
      </Picker>
      <Picker
        selectedValue={characterClass}
        style={styles.picker}
        onValueChange={(itemValue) => setCharacterClass(itemValue)}
      >
        {classes.map((cls, index) => (
          <Picker.Item key={index} label={cls} value={cls} />
        ))}
      </Picker>
      <Button title="Create Character" onPress={handleCreateCharacter} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  picker: {
    height: 100,
    width: '100%',
    marginBottom: 10,
  },
});

export default CreateCharacterScreen;
