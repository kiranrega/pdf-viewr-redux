// fileSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  files: [],
  status: 'idle',
  error: null,
};

const fileSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    uploadFile: (state, action) => {
      state.status = 'succeeded';
      state.files.push(action.payload);
    },
    handleSingleFile: (state, action) => {
      state.status ='succeeded';
      state.files = [action.payload];
    }
  },
});

export const { uploadFile, handleSingleFile } = fileSlice.actions;

export default fileSlice.reducer;
