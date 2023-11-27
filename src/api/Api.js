import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const createCharacter = async (characterData) => {
  try {
    console.log(characterData);
    const response = await axios.post(
      `${API_URL}/aws/createChar`,
      characterData
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating character:', error);
    throw error;
  }
};

export const startNewGame = async (characterData) => {
  try {
    const response = await axios.post(`${API_URL}/aws/prompt/1`);
    return response.data;
  } catch (error) {
    console.error('Error starting new game:', error);
    throw error;
  }
};
