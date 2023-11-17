'use strict';

import { createSlice } from '@reduxjs/toolkit';

const characterCreatorSlice = createSlice({
  name: 'characterCreator',
  initialState: {
    name: '',
    race: '',
    characterClass: '',
    age: '',
  },
  reducers: {
    setCharacterField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    resetCharacterForm: (state) => {
      state.name = '';
      state.race = '';
      state.characterClass = '';
      state.age = '';
    },
  },
});

export const { setCharacterField, resetCharacterForm } =
  characterCreatorSlice.actions;
export default characterCreatorSlice.reducer;
