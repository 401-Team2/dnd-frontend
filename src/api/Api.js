import axios from 'axios';

const API_GATEWAY_URL = 'https://tjmp838d98.execute-api.us-west-2.amazonaws.com/WorkingPOST/user/1';

const api = {
  startNewGame: async () => {
    try {
      const response = await axios.post(`${API_GATEWAY_URL}/startgame`);
      return response.data;
    } catch (error) {
      console.error('Error starting new game:', error);
      throw error;
    }
  },

  loadGame: async (characterId) => {
    try {
      const response = await axios.post(`${API_GATEWAY_URL}/loadgame`, { characterId });
      return response.data;
    } catch (error) {
      console.error('Error loading game:', error);
      throw error;
    }
  },

  continueGame: async (data, userChoice) => {
    try {
      const response = await axios.post(`${API_GATEWAY_URL}/adventure`, { ...data, userChoice });
      return response.data;
    } catch (error) {
      console.error('Error continuing game:', error);
      throw error;
    }
  },

  fetchCharacters: async () => {
    try {
      const response = await axios.get(`${API_GATEWAY_URL}/characters`);
      return response.data;
    } catch (error) {
      console.error('Error fetching characters:', error);
      throw error;
    }
  },
  createCharacter: async (characterData) => {
    try {
      const response = await axios.post(`${API_GATEWAY_URL}/createcharacter`, characterData);
      return response.data;
    } catch (error) {
      console.error('Error creating character:', error);
      throw error;
    }
  },
};

export default api;
