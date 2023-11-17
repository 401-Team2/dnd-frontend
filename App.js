import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  useEffect(() => {
    var config = {
      method: 'get',
      url: 'https://tjmp838d98.execute-api.us-west-2.amazonaws.com/WorkingGET/user/1',
      headers: { }    
    };
  })
  return (
    <View style={styles.container}>
      <AppNavigator />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
