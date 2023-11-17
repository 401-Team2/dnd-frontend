// import axios from 'axios';
// import Config from 'react-native-config';


// const SERVER_URL = Config.SERVER_URL;

// export const fetchInitialData = async () => {
//   try {
//     const response = await axios.post(`${SERVER_URL}/adventure`);
//     const responseData = response.data;
//     console.log("HERE'S THE RESPONSE ", response);
//     populateFormWithData(responseData);
//   } catch (error) {
//     console.error('Error:', error);
//   }
// };

// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const app = express();
// const axios = require('axios');

// dotenv.config();
// const PORT = process.env.PORT;

// app.use(bodyParser.json());
// app.use(cors());

// // Define a route to handle the POST request
// app.post('/adventure', async (req, res) => {
//   try {
//     // Handle the POST request here
//     console.log("HERE'S THE REQUEST FROM FRONTEND:", req.body);
//     let response;

//     if (req.body && Object.keys(req.body).length > 0) {
//       const requestBody = req.body;
//       response = await axios.post(
//         'https://tjmp838d98.execute-api.us-west-2.amazonaws.com/WorkingPOST/user/1',
//         requestBody
//       );
//     } else {
//       response = await axios.post(
//         'https://tjmp838d98.execute-api.us-west-2.amazonaws.com/WorkingPOST/user/1'
//       );
//     }

//     console.log("HERE'S THE RESPONSE:", response.data);
//     res.json(response.data);
//   } catch (error) {
//     console.error('Error processing the request:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on PORT ${port}`);
// });