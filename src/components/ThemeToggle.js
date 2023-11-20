import React from 'react';
import { View, Switch, StyleSheet } from 'react-native';

const ThemeToggle = ({ isDarkMode, toggleTheme }) => {
  return (
    <View style={styles.container}>
      <Switch
        value={isDarkMode}
        onValueChange={toggleTheme}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
  },
});

export default ThemeToggle;
