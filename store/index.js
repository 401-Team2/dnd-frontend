'use strict';

import { configureStore } from '@reduxjs/toolkit';
import characterCreatorReducer from './characterCreator';

const store = configureStore({
  reducer: {
    characterCreator: characterCreatorReducer,
  },
});

export default store;
