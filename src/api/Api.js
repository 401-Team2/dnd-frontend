import axios from 'axios';

const API_URL = 'https://questforgebackend.onrender.com'; // Replace with your server URL

export const createCharacter = async (characterData) => {
  try {
    const response = await axios.post(`${API_URL}/character/createcharacter`, characterData);
    return response.data;
  } catch (error) {
    console.error('Error creating character:', error);
    throw error;
  }
};

export const startNewGame = async (characterData) => {
  try {
    const response = await axios.post(`${API_URL}/game/startgame`, { characterData });
    return response.data;
  } catch (error) {
    console.error('Error starting new game:', error);
    throw error;
  }
};

// export const generateStory = async (prompt) => {
//   try {
//     const response = await axios.post(`https://tjmp838d98.execute-api.us-west-2.amazonaws.com/WorkingPOST/user/{USER_ID}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error generating story:', error);
//     throw error;
//   }
// };

// export const handleUserChoice = async (choice) => {
//   try {
//     const response = await axios.post(`https://tjmp838d98.execute-api.us-west-2.amazonaws.com/WorkingPOST/user/{USER_ID}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error handling user choice:', error);
//     throw error;
//   }
// }
