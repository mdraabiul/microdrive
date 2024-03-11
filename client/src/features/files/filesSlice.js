import { createSlice } from "@reduxjs/toolkit";

export const filesSlice = createSlice({
  name: "files",
  initialState: {
    files : [],
  },
  reducers: {
    addFiles: (state,action) => {
      state.files = action.payload;
    },
    deleteFile: (state) => {
      state.value -= 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addFiles, deleteFile } = filesSlice.actions;

export default filesSlice.reducer;
