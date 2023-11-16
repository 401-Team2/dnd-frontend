import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const OptionList = ({ options, onChoose }) => {
  return (
    <View style={styles.optionsContainer}>
      {options.map((option, index) => (
        <TouchableOpacity key={index} style={styles.optionButton} onPress={() => onChoose(option)}>
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default OptionList;
