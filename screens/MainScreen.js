import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import axios from 'axios';
// import OptionList from 'src/components/OptionList.js';
import UserInfo from '../components/UserInfo';
import { fetchInitialData } from '../utils/api';

const MainScreen = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchInitialData().then(setData);
  }, []);

  return (
      <View style={styles.container}>
        <Text style={styles.title}>Quest Forge</Text>
        {data && data.user && <UserInfo user={data.user} />}
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
});

export default MainScreen;
