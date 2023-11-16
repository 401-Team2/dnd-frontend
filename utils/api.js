import axios from 'axios';

const SERVER_URL = process.env.VITE_SERVER_URL;

export const fetchInitialData = async () => {
  try {
    const response = await axios.post(`${SERVER_URL}/adventure`);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
  }
};
