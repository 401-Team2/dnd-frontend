import React from 'react';
import { ImageBackground, Text, StyleSheet } from 'react-native';
import { useTheme } from '../utils/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';
import bgImg from '../../assets/bgImg.jpeg';

const SettingsScreen = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <ImageBackground 
      source={bgImg}
      style={{flex: 1, justifyContent: 'center', alignItems: 'center', opacity: 0.9}}
    >
      <Text style={styles.title}>Options</Text>
      <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default SettingsScreen;
